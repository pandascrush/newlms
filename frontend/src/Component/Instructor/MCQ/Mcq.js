import React, { useState } from "react";
import "./Mcq.css";
import * as XLSX from "xlsx";
import uploadim from "../../../Asset/6324.jpg";

function Mcq() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      question: newQuestion,
      options: options,
      correctOption: correctOption,
    };
    setQuestions([...questions, question]);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      json.forEach((row, index) => {
        if (index === 0) return;
        const question = {
          question: row[0],
          options: [row[1], row[2], row[3], row[4]],
          correctOption: row[5],
        };
        setQuestions((prevQuestions) => [...prevQuestions, question]);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="containe mx-5">
      <div className="row ">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                className="form-control"
                value={newQuestion}
                onChange={handleQuestionChange}
                required
              />
            </div>
            <div className="form-group">
              {options.map((option, index) => (
                <div key={index} className="form-group">
                  <label>Option {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Correct Option</label>
              <input
                type="text"
                className="form-control"
                value={correctOption}
                onChange={handleCorrectOptionChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Question
            </button>
          </form>
          <div className="mt-4">
            <h3>Questions List</h3>
            <ul className="list-group">
              {questions.map((question, index) => (
                <li key={index} className="list-group-item">
                  <strong>{question.question}</strong>
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        {option}{" "}
                        {option === question.correctOption ? "(Correct)" : ""}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col">
          <h6>Choose File from your Device</h6>
          <div className="uploadim mt-2 p-4">
            <img src={uploadim} style={{ height: "90px" }} className="impart" />
            <p>Upload the file</p>
            <input
              type="file"
              className="d-block mt-2"
              accept=".xls, .xlsx"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mcq;
