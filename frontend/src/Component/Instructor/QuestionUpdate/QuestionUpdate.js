import axios from "axios";
import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react"; // Assuming JoditEditor is already installed

function QuestionUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [updatedQuestions, setUpdatedQuestions] = useState({});
  const [showFeedbackEditor, setShowFeedbackEditor] = useState({}); // Track which feedback editors are visible

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    setSelectedModuleId(moduleId);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}quiz/getmodulequestions/${moduleId}`
      )
      .then((res) => {
        console.log(res);

        setQuestions(res.data.result);
        const initialUpdatedQuestions = {};
        const initialShowFeedbackEditor = {};
        res.data.result.forEach((q) => {
          initialUpdatedQuestions[q.id] = {
            text: q.text,
            feedbacks: q.feedback,
            options: q.option.map((opt) => ({
              ...opt,
              feedback: opt.feedback, // Track feedback separately
              marks: opt.marks, // Add marks field
              keyword: opt.keyword, // Add keyword field
            })),
            correct_answer: q.correct_answer,
            check_data: q.check_data,
            question_type: q.question_type,
            subQuestions: q.subQuestions
              ? q.subQuestions.map((subQ) => ({
                  id: subQ.id,
                  subquestion_text: subQ.subquestion_text, // Add subquestion text
                  options: subQ.options.map((opt) => ({
                    id: opt.id,
                    option_text: opt.option_text,
                    is_correct: opt.is_correct,
                  })),
                }))
              : [], // If no subQuestions, default to an empty array
          };

          // Initially hide the feedback editor for each option
          q.option.forEach((opt, index) => {
            initialShowFeedbackEditor[`${q.id}_${index}`] = false;
          });
        });

        setUpdatedQuestions(initialUpdatedQuestions);
        setShowFeedbackEditor(initialShowFeedbackEditor);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  };

  // console.log(updatedQuestions.feedback);

  const handleQuestionChange = (questionId, field, value) => {
    setUpdatedQuestions({
      ...updatedQuestions,
      [questionId]: {
        ...updatedQuestions[questionId],
        [field]: value,
      },
    });
  };

  const handleOptionChange = (
    questionId,
    subQIndex,
    field,
    value,
    optIndex = null
  ) => {
    const updatedQuestionsCopy = { ...updatedQuestions };

    if (updatedQuestionsCopy[questionId].question_type === "match") {
      if (field === "feedback") {
        // Update the general feedback for the "match" question type
        updatedQuestionsCopy[questionId] = {
          ...updatedQuestionsCopy[questionId],
          feedback: value,
        };
      } else {
        // Handle updating sub-questions and options for "match" question type
        const updatedSubQuestions = [
          ...updatedQuestionsCopy[questionId].subQuestions,
        ];

        if (field === "subquestion_text") {
          // Update the left side (subquestion_text)
          updatedSubQuestions[subQIndex] = {
            ...updatedSubQuestions[subQIndex],
            subquestion_text: value,
          };
        } else if (field === "option_text" && optIndex !== null) {
          // Update the right side (options -> option_text)
          const updatedOptions = [...updatedSubQuestions[subQIndex].options];
          updatedOptions[optIndex] = {
            ...updatedOptions[optIndex],
            option_text: value,
          };

          updatedSubQuestions[subQIndex] = {
            ...updatedSubQuestions[subQIndex],
            options: updatedOptions,
          };
        }

        updatedQuestionsCopy[questionId] = {
          ...updatedQuestionsCopy[questionId],
          subQuestions: updatedSubQuestions,
        };
      }
    } else {
      // Handle normal option update for non-match questions
      const updatedOptions = [...updatedQuestionsCopy[questionId].options];
      updatedOptions[subQIndex] = {
        ...updatedOptions[subQIndex],
        [field]: value,
      };

      updatedQuestionsCopy[questionId] = {
        ...updatedQuestionsCopy[questionId],
        options: updatedOptions,
      };
    }

    setUpdatedQuestions(updatedQuestionsCopy);
  };

  const toggleFeedbackEditor = (questionId, index) => {
    setShowFeedbackEditor((prevState) => ({
      ...prevState,
      [`${questionId}_${index}`]: !prevState[`${questionId}_${index}`],
    }));
  };

  const handleSubmit = () => {
    console.log(selectedModuleId, updatedQuestions);

    axios
      .post(`${process.env.REACT_APP_API_URL}quiz/updatequestion`, {
        moduleId: selectedModuleId,
        questions: updatedQuestions,
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.error === "An error occurred while updating the question"
        ) {
          alert("An error occurred while updating the question");
        } else if (res.data.message === "Questions updated successfully") {
          alert("Questions updated successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error updating questions:", err);
        alert("Error updating questions:", err);
      });
  };

  return (
    <>
      <h2 className="text-center">Update Questions</h2>
      <div className=" container entirequizpart p-4 rounded-3">
        {/* Select Box for Modules */}
        <div>
          <label className="py-4">
            <b>Select Module:</b>
          </label>
          <br />
          <select value={selectedModuleId} onChange={handleModuleChange}>
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.moduleid} value={module.moduleid}>
                {module.modulename}
              </option>
            ))}
          </select>
        </div>

        {/* Display Questions */}
        <div className="py-5">
          <h5>Questions for Selected Module:</h5>
          {questions.length > 0 ? (
            <ul>
              {questions.map((question, index) => (
                <li key={question.id}>
                  {/* Rich text editor for question text */}
                  <JoditEditor
                    value={updatedQuestions[question.id].text}
                    onBlur={(newText) =>
                      handleQuestionChange(question.id, "text", newText)
                    }
                  />

                  {/* Descriptive Question Type */}
                  {question.question_type === "descriptive" && (
                    <div>
                      <h4>Descriptive</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              value={opt.keyword}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "keyword",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  className="jod"
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Multiple Choice Question Type */}
                  {question.question_type === "multiple_choice" && (
                    <div>
                      <h4>Multiple Choice Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              className="opttext"
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Check Question Type */}
                  {question.question_type === "check" && (
                    <div>
                      <h4>Check Options</h4>
                      {updatedQuestions[question.id].options.map(
                        (opt, index) => (
                          <div key={index} style={{ marginBottom: "15px" }}>
                            <label>Option:</label>
                            <textarea
                              className="opttext"
                              value={opt.option}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  index,
                                  "option",
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={40}
                            />

                            {/* Add Feedback Button */}
                            <button
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "#001040",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                toggleFeedbackEditor(question.id, index)
                              }
                            >
                              {showFeedbackEditor[`${question.id}_${index}`]
                                ? "Hide Feedback"
                                : "Add Feedback"}
                            </button>

                            {/* Conditionally show rich text editor for feedback */}
                            {showFeedbackEditor[`${question.id}_${index}`] && (
                              <div style={{ marginTop: "10px" }}>
                                <label>Feedback:</label>
                                <JoditEditor
                                  value={opt.feedback}
                                  onBlur={(newFeedback) =>
                                    handleOptionChange(
                                      question.id,
                                      index,
                                      "feedback",
                                      newFeedback
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Match the Following Question Type */}
                  {question.question_type === "match" && (
                    <div>
                      <h4>Match the Following</h4>

                      {/* Single, constant feedback box for the entire match question */}
                      <div style={{ marginBottom: "15px" }}>
                        <label>General Feedback:</label>
                        <JoditEditor
                          value={
                            updatedQuestions[question.id].feedbacks &&
                            updatedQuestions[question.id].feedbacks.length > 0
                              ? updatedQuestions[question.id].feedbacks[0]
                                  .feedback // Access the first feedback object
                              : "" // Default to an empty string if no feedback exists
                          }
                          onBlur={(newFeedback) =>
                            handleOptionChange(
                              question.id,
                              null, // No subQuestion index needed since this is general feedback
                              "feedback", // Match the key in initialUpdatedQuestions
                              newFeedback // Wrap in an array to maintain the format
                            )
                          }
                        />
                      </div>

                      {/* Iterate over subQuestions */}
                      {updatedQuestions[question.id].subQuestions.map(
                        (subQ, subQIndex) => (
                          <div key={subQIndex} style={{ marginBottom: "15px" }}>
                            {/* Left side (subquestion text) */}
                            <label>Left side:</label>
                            <textarea
                              className="opttext"
                              value={subQ.subquestion_text}
                              onChange={(e) =>
                                handleOptionChange(
                                  question.id,
                                  subQIndex,
                                  "subquestion_text", // Indicate it's the subquestion_text field (left side)
                                  e.target.value
                                )
                              }
                              rows={3}
                              cols={20}
                            />

                            {/* Right side (option text) */}
                            {subQ.options.map((opt, optIndex) => (
                              <span
                                key={optIndex}
                                style={{ marginLeft: "10px" }}
                              >
                                <label>Right side:</label>
                                <textarea
                                  className="opttext"
                                  value={opt.option_text}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      question.id,
                                      subQIndex, // Subquestion index
                                      "option_text", // Indicate it's the option_text field (right side)
                                      e.target.value,
                                      optIndex // Option index
                                    )
                                  }
                                  rows={3}
                                  cols={20}
                                />
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Correct Answer (Common for all types) */}
                  <div>
                    <label>Correct Answer:</label>
                    <input
                      type="text"
                      value={
                        question.question_type === "multiple_choice"
                          ? updatedQuestions[question.id].correct_answer || ""
                          : question.question_type === "check"
                          ? updatedQuestions[question.id].check_data || "" // Accessing first element of check_data array
                          : updatedQuestions[question.id].correct_answer || ""
                      }
                      onChange={(e) => {
                        const fieldToUpdate =
                          question.question_type === "multiple_choice"
                            ? "correct_answer"
                            : question.question_type === "check"
                            ? "check_data"
                            : "correct_answer";

                        // If it's a check type, we handle the array structure for check_data
                        if (question.question_type === "check") {
                          handleQuestionChange(question.id, fieldToUpdate, [
                            e.target.value,
                          ]); // Wrap in array
                        } else {
                          handleQuestionChange(
                            question.id,
                            fieldToUpdate,
                            e.target.value
                          );
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available for this module.</p>
          )}
        </div>

        <button onClick={handleSubmit} className="subbtn">
          Update Questions
        </button>
      </div>
    </>
  );
}

export default QuestionUpdate;
