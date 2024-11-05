import React, { useState } from "react";
import * as XLSX from "xlsx";

const Questionbank = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Handle file upload and parse the Excel file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setQuestions(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (questionIndex, option) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      if (!updated[questionIndex]) updated[questionIndex] = [];
      if (updated[questionIndex].includes(option)) {
        updated[questionIndex] = updated[questionIndex].filter(
          (opt) => opt !== option
        );
      } else {
        updated[questionIndex].push(option);
      }
      return updated;
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1>Upload Quiz</h1>

        {/* Upload Button */}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{ marginBottom: "20px" }}
        />

        {/* Display Questions */}
        {questions.length > 0 && (
          <div>
            <h2>Quiz Questions</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index} style={{ marginBottom: "20px" }}>
                  <div>
                    <strong>Question:</strong> {question.Question}
                  </div>
                  <div>
                    <strong>Options:</strong>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[index]?.includes(
                              question["Option 1"]
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(index, question["Option 1"])
                          }
                        />
                        {question["Option 1"]}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[index]?.includes(
                              question["Option 2"]
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(index, question["Option 2"])
                          }
                        />
                        {question["Option 2"]}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[index]?.includes(
                              question["Option 3"]
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(index, question["Option 3"])
                          }
                        />
                        {question["Option 3"]}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            selectedOptions[index]?.includes(
                              question["Option 4"]
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(index, question["Option 4"])
                          }
                        />
                        {question["Option 4"]}
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* //secondpart */}
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default Questionbank;
