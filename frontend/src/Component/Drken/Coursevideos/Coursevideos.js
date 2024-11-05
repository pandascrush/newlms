import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./Coursevideos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import { faStar } from "@fortawesome/free-solid-svg-icons";

function CourseVideos() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("quiz");
  const [sidebarItems, setSidebarItems] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [moduleName, setModuleName] = useState("");
  const [currentDepth, setCurrentDepth] = useState(1);
  const [cardContent, setCardContent] = useState(null);
  const [scoreDetails, setScoreDetails] = useState({
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  });
  const [chapter, setChapter] = useState([]);
  const [content, setContent] = useState(false);

  const { course, module, id } = useParams();
  const navigate = useNavigate();
  const now = (answeredQuestions.size / questions.length) * 100;
  const [showScoreCard, setShowScoreCard] = useState(false);
  const [attempts, setAttempts] = useState([]); // State to store all attempts

  const [haspaid, setHasPaid] = useState();

  //Payment status
  useEffect(() => {
    // Fetch payment status
    axios
      .get(`${process.env.REACT_APP_API_URL}user/paymentstatus/${id}`)
      .then((res) => {
        console.log(res.data);
        setHasPaid(res.data.hasPaid); // Set the payment status
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Question api
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}course/activity/${course}/${module}`
      )
      .then((res) => {
        console.log(res.data);

        const items = res.data.activities;
        setSidebarItems(items);
        setModuleName(res.data.modulename);

        if (items.length > 0) {
          const firstItem = items[0];
          if (firstItem.quiz_type_name) {
            handleContentChange("quiz", firstItem.questions);
          } else {
            handleContentChange("video", []);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [course, module]);
  const question = questions[currentIndex];

  // upcoming modules
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/${course}/${module}`)
      .then((res) => {
        setChapter(res.data);
        // console.log(res.data);
      });
  }, []);

  const handleContentChange = (content, questions = []) => {
    setActiveContent(content);
    setQuestions(questions);
    setCurrentIndex(0);
    setAnsweredQuestions(new Set());
  };

  const handleNext = (a) => {
    if (activeContent === "quiz") {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        if (currentDepth === 1) {
          if (a === 2) {
            const nextVideoItem = sidebarItems.find(
              (item) => item.depth === "2"
            );
            setCurrentDepth(2);
            handleContentChange("video", []);
            setContent(false);
            setShowScoreCard(false);
            setHideCircularBar(false); // Hide circular bar for video content
          } else {
            handleSubmitPreAssessment();
            setShowScoreCard(true);
            setHideCircularBar(false); // Hide circular bar after pre-assessment submission
          }
        } else if (currentDepth === 2) {
          const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
          if (nextQuizItem) {
            setCurrentDepth(3);
            handleContentChange("quiz", nextQuizItem.questions || []);
            setHideCircularBar(true); // Show circular bar for post-assessment quiz
          }
        } else if (currentDepth === 3) {
          if (a === 2) {
            const nextVideoItem = sidebarItems.find(
              (item) => item.depth === "2"
            );
            setCurrentDepth(1);
            handleContentChange("quiz", []);
            setContent(false);
            setShowScoreCard(false);
            setHideCircularBar(false); // Hide circular bar for non-quiz depth
          } else {
            handleSubmitPostAssessment();
            setShowScoreCard(true);
            setHideCircularBar(false); // Hide circular bar after post-assessment submission
          }
        }
      }
    } else if (activeContent === "video") {
      const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
      if (nextQuizItem) {
        setCurrentDepth(3);
        setHideCircularBar(true); // Show circular bar for new quiz content
        handleContentChange("quiz", nextQuizItem.questions || []);
      }
    }
  };

  const handlePrevious = () => {
    if (activeContent === "quiz" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // const handleOptionChange = (event) => {
  //   const selectedOption = event.target.value;
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [currentIndex]: selectedOption,
  //   }));
  //   setAnsweredQuestions((prev) => new Set(prev).add(currentIndex));
  // };

  const handleOptionChange = (questionId, subquestionId = null, event) => {
    const selectedOption = event.target.value;

    setSelectedOptions((prev) => {
      if (subquestionId) {
        // For match-the-following questions
        return {
          ...prev,
          [`${questionId}_${subquestionId}`]: selectedOption, // Use a combination of questionId and subquestionId as key
        };
      } else {
        // For multiple choice or descriptive questions
        return {
          ...prev,
          [questionId]: selectedOption,
        };
      }
    });

    // Mark the question as answered
    // setAnsweredQuestions((prev) => {
    //   const updatedSet = new Set(prev);
    //   updatedSet.add(questionId); // Add only the main questionId to the answered set
    //   return updatedSet;
    // });
    setAnsweredQuestions((prev) => new Set(prev).add(currentIndex));
    console.log(answeredQuestions);
  };

  const handleCheckboxChange = (questionId, option, event) => {
    const isChecked = event.target.checked;
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelections = prevSelectedOptions[questionId] || [];
      if (isChecked) {
        // Add option to array for this question if checked
        return {
          ...prevSelectedOptions,
          [questionId]: [...currentSelections, option],
        };
      } else {
        // Remove option from array if unchecked
        return {
          ...prevSelectedOptions,
          [questionId]: currentSelections.filter((opt) => opt !== option),
        };
      }
    });
    setAnsweredQuestions((prev) => new Set(prev).add(currentIndex));
  };

  const handleSubmitPreAssessment = () => {
    const userId = id === undefined || id === "undefined" ? 0 : id;
    const result = []; // For multiple choice questions
    const match = []; // For match-the-following questions
    const desc = []; // For descriptive questions
    const check = []; // For checkbox questions

    questions.forEach((question) => {
      // Handle multiple choice questions
      if (question.question_type === "multiple_choice") {
        const userAnswer = selectedOptions[question.id];
        result.push({
          question_id: question.id,
          user_answer: userAnswer || null,
          correct: userAnswer === question.correct_answer,
        });
      }

      // Handle match-the-following questions
      else if (question.question_type === "match") {
        const matchAnswers = question.match_subquestions.map((subq) => {
          const userAnswer =
            selectedOptions[`${question.id}_${subq.subquestion_id}`];
          return {
            subquestion_id: subq.subquestion_id,
            user_answer: userAnswer || null,
          };
        });

        match.push({
          question_id: question.id,
          match_answers: matchAnswers,
        });
      }

      // Handle descriptive questions
      else if (question.question_type === "descriptive") {
        const userAnswer = selectedOptions[question.id];
        desc.push({
          question_id: question.id,
          user_answer: userAnswer || null,
        });
      }

      // Handle checkbox questions
      else if (question.question_type === "check") {
        const userAnswers = selectedOptions[question.id];
        check.push({
          question_id: question.id,
          user_answers: userAnswers || [],
        });
      }
    });

    // console.log(result);
    // console.log(match);
    // console.log(desc);
    // console.log(check);

    // API submission
    axios
      .post(
        `${
          process.env.REACT_APP_API_URL
        }quiz/savequiz/${userId}/${1}/${module}`,
        {
          result,
          match,
          desc,
          check,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Quiz attempt and log saved successfully") {
          setAttempts(res.data.attempts);
          setShowScoreCard(true);
          // console.log(res.data);
        } else {
          toast.error("Error saving quiz");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(attempts);

  const handleSubmitPostAssessment = () => {
    const userId = id === undefined || id === "undefined" ? 0 : id;
    const result = []; // For multiple choice questions
    const match = []; // For match-the-following questions
    const desc = []; // For descriptive questions
    const check = []; // For checkbox questions

    questions.forEach((question) => {
      // Handle multiple choice questions
      if (question.question_type === "multiple_choice") {
        const userAnswer = selectedOptions[question.id];
        result.push({
          question_id: question.id,
          user_answer: userAnswer || null,
          correct: userAnswer === question.correct_answer,
        });
      }

      // Handle match-the-following questions
      else if (question.question_type === "match") {
        const matchAnswers = question.match_subquestions.map((subq) => {
          const userAnswer =
            selectedOptions[`${question.id}_${subq.subquestion_id}`];
          return {
            subquestion_id: subq.subquestion_id,
            user_answer: userAnswer || null,
          };
        });

        match.push({
          question_id: question.id,
          match_answers: matchAnswers,
        });
      }

      // Handle descriptive questions
      else if (question.question_type === "descriptive") {
        const userAnswer = selectedOptions[question.id];
        desc.push({
          question_id: question.id,
          user_answer: userAnswer || null,
        });
      }

      // Handle checkbox questions
      else if (question.question_type === "check") {
        const userAnswers = selectedOptions[question.id];
        check.push({
          question_id: question.id,
          user_answers: userAnswers || [],
        });
      }
    });

    console.log(result);
    console.log(match);
    console.log(desc);
    console.log(check);

    // API submission
    axios
      .post(
        `${
          process.env.REACT_APP_API_URL
        }quiz/savequiz/${userId}/${2}/${module}`,
        {
          result,
          match,
          desc,
          check,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Quiz attempt and log saved successfully") {
          setAttempts(res.data.attempts);
          setShowScoreCard(true);
        } else {
          toast.error("Error saving quiz");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuestionClick = (index) => {
    setCurrentIndex(index);
  };

  const handleViewScore = () => {
    setShowScoreCard(false);
    setContent(true);
    setHideCircularBar(false);
  };

  const handleAttempt = () => {
    console.log("attempt");

    if (currentDepth === 1) {
      setCurrentDepth(1);
      setContent(false);
      setShowScoreCard(false);

      handleContentChange(
        "quiz",
        sidebarItems.find((item) => item.depth === "1")?.questions || []
      );
    } else {
      setCurrentDepth(3);
      setContent(false);
      setShowScoreCard(false);
      const nextQuizItem = sidebarItems.find((item) => item.depth === "3");
      if (nextQuizItem) {
        setCurrentDepth(3);
        handleContentChange("quiz", nextQuizItem.questions || []);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}quiz/getcorrectanswers/${course}/${module}`
      )
      .then((res) => {
        console.log(res);
        setCorrectAnswers(res.data.questions);
      });
  }, [course, module]);

  const handleReviewClick = () => {
    // Get the latest attempt from the attempts array
    const latestAttempt = attempts[attempts.length - 1];

    // Map through questions, using `correctAnswers` to find the correct answers conditionally
    const reviewContent = questions.map((question) => {
      const attemptAnswer = latestAttempt.result.find(
        (result) => result.question_id === question.id
      );

      // Find the correct answer for the current question from `correctAnswers` with flexible key matching
      const correctAnswerObj = correctAnswers.find(
        (correctAnswer) =>
          correctAnswer.question_id === question.id ||
          correctAnswer.id === question.id
      );

      // Determine the correct answer based on question type and correctAnswers data
      let correctAnswer;
      let feedbacks;

      // Determine correct answers and feedback based on question type
      if (question.question_type === "multiple_choice") {
        correctAnswer = correctAnswerObj?.correct_answer;
        feedbacks = correctAnswerObj?.option
          ?.map((opt) => opt.feedback)
          .filter((fb) => fb); // Get feedback only if it exists
      } else if (question.question_type === "check") {
        correctAnswer = correctAnswerObj?.check_data
          ? correctAnswerObj.check_data.join(", ")
          : "No correct answer available";
        feedbacks = correctAnswerObj?.option
          ?.map((opt) => opt.feedback)
          .filter((fb) => fb); // Get feedback only if it exists
      } else if (question.question_type === "descriptive") {
        correctAnswer = correctAnswerObj?.option
          ? correctAnswerObj.option.map((opt) => opt.keyword).join(", ")
          : "No keywords available";

        feedbacks = correctAnswerObj?.option
          ?.map((opt) => opt.feedback)
          .filter((fb) => fb); // Get feedback only if it exists
      } else if (question.question_type === "match") {
        // For "match" type, format the correct answers for display
        correctAnswer = correctAnswerObj?.correct_answers
          ? correctAnswerObj.correct_answers
              .map((match) => `${match.subQuestionId}: ${match.correctAnswer}`)
              .join(", ")
          : "No correct answers available";

        // Retrieve feedback for each match option, if available
        feedbacks = correctAnswerObj?.feedback // Assuming feedbacks is the key holding the array of feedback objects
          ? correctAnswerObj.feedback
              .map((fb) => fb.feedback)
              .filter((fb) => fb) // Access feedback directly
          : [];
      } else {
        correctAnswer = "No correct answer available";
      }

      return {
        question: question.text,
        selectedAnswer: attemptAnswer
          ? attemptAnswer.user_answer
          : "No answer selected",
        correctAnswer: correctAnswer,
        feedback: feedbacks,
      };
    });

    setReviewData(reviewContent);
    setIsReviewing(true);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const [startQuiz, setStartQuiz] = useState(false);

  const [hideCircularBar, setHideCircularBar] = useState(true);

  // Function to handle starting the quiz
  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ToastContainer />
          <div
            className={`col-auto ${
              isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
            style={{ width: isSidebarOpen ? "250px" : "50px" }} // Set a fixed width
          >
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-light toggle-button"
            >
              <FaBars />
            </button>
            <div
              className={`sidebar-content ${
                isSidebarOpen ? "d-block" : "d-none"
              }`}
            >
              <p className="my-3 sidetext p-2">
                <b
                  style={{
                    color: "#001040",
                    fontSize: "20px",
                  }}
                >
                  {moduleName && moduleName.length > 11 ? (
                    <>
                      {moduleName.slice(0, 11)} <br /> {moduleName.slice(11)}
                    </>
                  ) : (
                    moduleName || "Module"
                  )}
                </b>
              </p>
              {sidebarItems.map((item, index) => {
                const title = item.quiz_type_name || item.activity_name;

                const formattedTitle =
                  title.length > 11 ? (
                    <>
                      {title.slice(0, 11)} <br /> {title.slice(11)}
                    </>
                  ) : (
                    title
                  );

                return (
                  <div
                    style={{
                      color: "#001040",
                      maxWidth: "200px",
                    }}
                    key={index}
                    className="card text-dark my-2 p-2 border-0 sideshadow"
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        display: "block",
                        maxWidth: "300px",
                      }}
                      to="#"
                      className="sidebartext"
                      onClick={() => {
                        setStartQuiz(true);
                        item.quiz_type_name
                          ? handleContentChange("quiz", item.questions)
                          : handleContentChange("video", []);
                      }}
                    >
                      <img
                        src={item.quiz_type_name ? sideicon1 : sideicon2}
                        className="mx-1 text-dark"
                        alt={title}
                      />
                      {formattedTitle}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`col ${
              isSidebarOpen ? "col-sm-12 col-md-6" : "col-sm-12 col-md-6"
            } mt-5 secondpartquiz px-2`}
          >
            <div className="mt-lg-5">
              {loading && <Spinner animation="border" />}
              {error && (
                <>
                  <p>Content is not available</p>{" "}
                  <Link className="btn btn-success" to={`/user/${id}`}>
                    Home
                  </Link>
                </>
              )}
              {!startQuiz ? (
                <div className="quizpart p-3 quizparttext">
                  <h1 className="profoundhead my-4">
                    To Me Testing Is A Profound Duty.
                  </h1>
                  <p>
                    To me, the questions within a test are not mere inquiries;
                    they are pivotal moments that spotlight transformative
                    knowledge. They present key insights with the power to bring
                    about a positive shift in your life.
                  </p>
                  <p>
                    Picture this: acquiring a treasure trove of 100 exceptional
                    points of wisdom about the spine—knowledge that empowers you
                    to shape your destiny afresh each day henceforth.
                  </p>
                  <p>
                    Know that these questions are composed with deep empathy and
                    with the greatest care, with your personal growth and
                    enlightenment at their core. They are a testament to my
                    dedication to your journey towards a brighter, more informed
                    future.
                  </p>
                  <p>Please learn and enjoy each question!</p>
                  <div className="d-flex justify-content-end">
                    <button
                      style={{ backgroundColor: "#001040", color: "white" }}
                      className="btn my-4"
                      onClick={handleStartQuiz}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ) : (
                activeContent === "quiz" &&
                !loading &&
                !error && (
                  <div>
                    {isReviewing ? (
                      <div className="review-container quizpart p-3 rounded-2">
                        <h3 className="quizrev">
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={() => setIsReviewing(false)}
                            style={{ color: "#f99420" }}
                          ></FontAwesomeIcon>{" "}
                          Review of the quiz:
                        </h3>
                        {reviewData.map((item, idx) => (
                          <div key={idx} className="review-item">
                            {/* Render question with HTML content using dangerouslySetInnerHTML */}
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `Q${idx + 1}: ${DOMPurify.sanitize(
                                  item.question
                                )}`,
                              }}
                            />
                            <div className="p-3">
                              {/* Render user's selected answer */}
                              <p className="ansreviewpara">
                                <strong>Your Answer:</strong>{" "}
                                {item.selectedAnswer}
                              </p>

                              {/* Render correct answer as plain text */}
                              <p>
                                <strong>Correct Answer:</strong>{" "}
                                {item.correctAnswer}
                              </p>

                              {/* Render feedback, if available, with HTML content */}
                              {item.feedback && item.feedback.length > 0 && (
                                <div>
                                  <strong>Feedback:</strong>
                                  {item.feedback.map((feedback, i) => (
                                    <p
                                      className="opttext"
                                      key={i}
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(feedback),
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : showScoreCard ? (
                      <div className="card quizpart p-4 d-flex flex-column justify-content-center align-items-center mx-2">
                        <h4 className="text-center">
                          Your answers were submitted.
                        </h4>
                        <button
                          className="p-2 scbtn btn btn-success"
                          onClick={handleViewScore}
                        >
                          View Score
                        </button>
                      </div>
                    ) : content ? (
                      <div className="container quizpart m-1 p-3 quizparttext rounded-2">
                        {/* <div className="quizpart p-3 quizparttext">
                          <h1 className="profoundhead my-4">
                            To Me Testing Is A Profound Duty.
                          </h1>
                          <p>
                            To me, the questions within a test are not mere
                            inquiries; they are pivotal moments that spotlight
                            transformative knowledge. They present key insights
                            with the power to bring about a positive shift in
                            your life.
                          </p>
                          <p>
                            Picture this: acquiring a treasure trove of 100
                            exceptional points of wisdom about the
                            spine—knowledge that empowers you to shape your
                            destiny afresh each day henceforth.
                          </p>
                          <p>
                            Know that these questions are composed with deep
                            empathy and with the greatest care, with your
                            personal growth and enlightenment at their core.
                            They are a testament to my dedication to your
                            journey towards a brighter, more informed future.
                          </p>
                          <p>Please learn and enjoy each question!</p>
                          <div className="d-flex justify-content-end"></div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            style={{
                              backgroundColor: "#001040",
                              color: "white",
                            }}
                            className="btn my-4"
                            onClick={handleAttempt}
                          >
                            Quiz Attempt
                          </button>
                        </div> */}
                        {/* Table displaying total questions and correct answers */}
                        <h4
                          className="summarytext my-3"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "20px",
                            margin: "10px 0px",
                            color: "#001040",
                          }}
                        >
                          Summary of Your Previous Attempts
                        </h4>
                        <div className="table-responsive">
                          {" "}
                          {/* Bootstrap class to make the table responsive */}
                          <table className="table mt-4 border-0 tabletextpart">
                            <thead>
                              <tr className="tabletextpart ">
                                <th>Attempt</th>
                                <th>State</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>Review</th>
                              </tr>
                            </thead>
                            <tbody style={{ border: "0px" }}>
                              {attempts.map((attempt) => (
                                <tr key={attempt.id} style={{ border: "0px" }}>
                                  <td>{attempt.attempt_count}</td>
                                  <td>
                                    Finished
                                    <br />
                                    Submitted
                                    <br />
                                    {new Date(
                                      attempt.attempt_timestamp
                                    ).toLocaleString("en-US", {
                                      weekday: "long", // E.g., 'Saturday'
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </td>

                                  <td>{`${attempt.score} / 100`}</td>
                                  <td>{`${attempt.correct_question} / ${attempt.total_question}`}</td>
                                  <td>
                                    <button
                                      style={{
                                        border: "0px",
                                      }}
                                      onClick={() => {
                                        handleReviewClick(); // Function to handle review action
                                      }}
                                      // Disable button if depth is not 3
                                      className={`btn ${
                                        currentDepth === 3 || 1 || 2 ? "" : ""
                                      }`} // Optional: Add different styles for enabled/disabled
                                    >
                                      Review
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="d-flex justify-content-end">
                          <button
                            style={{ color: "001040" }}
                            className="nxtbtn rounded-2 my-5 px-5"
                            onClick={() => {
                              if (currentDepth === 1) {
                                handleNext(2); // Navigate to depth 2
                              } else if (currentDepth === 3) {
                                handleShow();
                              }
                            }}
                          >
                            {currentDepth === 3 ? "Next Chapter" : "NEXT"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="quizpart rounded-2 p-4">
                        <h4>Quiz {currentIndex + 1}:</h4>
                        <div
                          style={{
                            fontFamily: "Times New Roman, Times, serif",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(question.text),
                          }}
                        />

                        {/* Render based on question type */}
                        {question.question_type === "multiple_choice" && (
                          <div className="options">
                            {question.options
                              .filter(
                                (optionObj) => optionObj.option.trim() !== ""
                              ) // Filter out empty options
                              .map((optionObj, index) => (
                                <div
                                  key={index}
                                  className="option d-flex py-2 opttext"
                                >
                                  <input
                                    type="radio"
                                    id={`option-${question.id}-${index}`}
                                    name={`question-${question.id}`} // Ensure unique name for each question
                                    value={optionObj.option}
                                    checked={
                                      selectedOptions[question.id] ===
                                      optionObj.option
                                    }
                                    onChange={(e) =>
                                      handleOptionChange(question.id, null, e)
                                    } // No subquestionId for MCQ
                                  />
                                  <label
                                    className="mx-2"
                                    htmlFor={`option-${question.id}-${index}`}
                                  >
                                    {optionObj.option}
                                  </label>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* Render descriptive question */}
                        {question.question_type === "descriptive" && (
                          <div className="descriptive opttext">
                            <input
                              type="text"
                              rows="4"
                              placeholder="Type your answer here..."
                              onChange={(e) =>
                                handleOptionChange(question.id, null, e)
                              } // Pass the question ID and event
                            />
                          </div>
                        )}

                        {/* Render match-the-following question */}
                        {question.question_type === "match" && (
                          <div className="match-questions opttext">
                            {question.match_subquestions.map((subq, index) => (
                              <div
                                key={subq.subquestion_id}
                                className="match-pair row my-5"
                              >
                                <div className="col-4">
                                  <div className="subquestion-text">
                                    {index + 1}. {subq.subquestion_text}
                                  </div>
                                </div>
                                <div className="col-8">
                                  <select
                                    className="form-select form-select-sm py-2"
                                    value={
                                      selectedOptions[
                                        `${question.id}_${subq.subquestion_id}`
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      handleOptionChange(
                                        question.id,
                                        subq.subquestion_id,
                                        e
                                      )
                                    }
                                  >
                                    <option value="" disabled>
                                      Select an option
                                    </option>
                                    {subq.options.map((opt) => (
                                      <option
                                        key={opt.option_text}
                                        value={opt.option_text}
                                      >
                                        {opt.option_text}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Render checkbox question */}
                        {question.question_type === "check" && (
                          <div className="options">
                            {question.options
                              .filter(
                                (optionObj) => optionObj.option.trim() !== ""
                              ) // Filter out empty options
                              .map((optionObj, index) => (
                                <div key={index} className="option d-flex">
                                  <input
                                    type="checkbox"
                                    id={`check-${question.id}-${index}`}
                                    name={`question-${question.id}`}
                                    value={optionObj.option}
                                    checked={
                                      Array.isArray(
                                        selectedOptions[question.id]
                                      ) &&
                                      selectedOptions[question.id].includes(
                                        optionObj.option
                                      )
                                    }
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        question.id,
                                        optionObj.option,
                                        e
                                      )
                                    }
                                  />
                                  <label
                                    className="mx-2"
                                    htmlFor={`check-${question.id}-${index}`}
                                  >
                                    {optionObj.option}
                                  </label>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="d-flex justify-content-between my-3">
                          <button
                            className="prevbtn rounded-2"
                            onClick={handlePrevious}
                            // disabled={currentIndex === 0}
                          >
                            Previous
                          </button>
                          <button
                            style={{
                              backgroundColor: "#001040",
                              color: "white",
                            }}
                            className="btn btn-success"
                            onClick={handleNext}
                            // disabled={
                            //   currentIndex === questions.length - 1 || currentIndex <= 1
                            //     ? false // Enable the submit button for the last question
                            //     : !answeredQuestions.has(question.id)
                            // } // Enable only if question is answered for others
                          >
                            {currentIndex === questions.length - 1
                              ? "Submit"
                              : "Next"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}

              {!loading && !error && activeContent === "video" && (
                <div>
                  <h4>{moduleName}</h4>
                  {/* Render all video content first */}
                  {sidebarItems
                    .filter((item) => item.depth === "2")
                    .map((item, index) => (
                      <div key={index} style={{ marginBottom: "20px" }}>
                        {/* Use the response HTML structure for embedding Vimeo video */}
                        <div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.page_content.replace(/<\/?p>/g, ""), // Clean up <p> tags
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                  {/* Show the "Next" button after all videos have been rendered */}
                  <div
                    className="d-flex justify-content-end my-3"
                    style={{ position: "relative", zIndex: 10 }} // Ensure button is on top of other elements
                  >
                    <button
                      style={{
                        backgroundColor: "#001040",
                        color: "white",
                        zIndex: 10, // Ensure button is clickable
                      }}
                      className="btn prevbtn my-5"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12 col-lg-3 mt-5">
            {hideCircularBar ? (
              <>
                <div className="card py-2 px-2 my-3">
                  <ProgressBar now={now} className="m-2 custom-progress-bar" />
                  <div className="d-flex justify-content-between px-2">
                    <p>Overall Progress</p>
                    <p>{now.toFixed(0)}%</p>
                  </div>
                </div>
                <hr />
                <div className="circular-question-numbers d-flex flex-wrap border border-2 p-3 rounded-3">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`circle m-1 ${
                        currentIndex === index ? "active" : ""
                      } ${answeredQuestions.has(index) ? "answered" : ""}`}
                      onClick={() => handleQuestionClick(index)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div></div>
            )}
            <h5>Chapters</h5>
            {chapter.map((e) => (
              <React.Fragment key={e.moduleid}>
                <div className="d-flex my-3">
                  <div className="orangecircle d-flex flex-column justify-content-center align-items-center">
                    <p className="m-2 numberclr">{e.moduleid}</p>
                  </div>
                  <div className="d-flex align-items-center card px-2 mx-3 rightcards border-0">
                    {haspaid ? (
                      <Link
                        style={{ textDecoration: "none", color: "#001040" }}
                        to={`/ken/${course}/${parseInt(e.moduleid)}/${id}`}
                      >
                        {e.modulename}{" "}
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="text-dark px-4"
                        />
                      </Link>
                    ) : (
                      <span style={{ color: "#999", cursor: "not-allowed" }}>
                        {e.modulename}{" "}
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="text-dark px-4"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered>
        <div style={{ backgroundColor: "#001040" }}>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
            className="custom-close"
          ></Modal.Header>
          <Modal.Body
            className="d-flex flex-column justify-content-center align-items-center text-light"
            style={{ backgroundColor: "#001040", padding: "20px" }}
          >
            <h5 className="mb-4">Well done! Chapter {module} is complete</h5>
            <p className="text-center">Rate Lesson</p>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  size="2x"
                  color={rating >= star ? "gold" : "white"} // Gold if rated, otherwise transparent
                  onClick={() => handleRating(star)}
                  style={{ cursor: "pointer", margin: "0 5px" }}
                />
              ))}
            </div>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#ffa200",
                border: "1px solid white",
                padding: "10px",
              }}
              onClick={() => {
                console.log(id);

                // Corrected condition
                if (id === "undefined" || id === undefined) {
                  handleClose(); // Close the modal
                  navigate(`/`); // Change the route to the default path
                  window.location.reload(); // Force a reload to fetch new content
                } else {
                  if (haspaid === true) {
                    console.log("if");
                    handleClose(); // Close the modal
                    navigate(`/ken/${course}/${parseInt(module) + 1}/${id}`); // Change the route with ID
                    window.location.reload(); // Force a reload to fetch new content
                  } else {
                    console.log("else", haspaid);
                    window.location.assign(`/user/${id}`);
                  }
                }
              }}
              className="rounded-5 text-light my-4"
            >
              Continue to Chapter {parseInt(module) + 1}
            </Link>

            <p className="mt-3">
              You rated this: {rating} star{rating !== 1 && "s"}
            </p>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/user/${id}`}
            >
              Back to all lessons
            </Link>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default CourseVideos;
