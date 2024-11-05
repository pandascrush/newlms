import React from "react";
import "./Score.css";

function Score() {
  return (
    <div className="container-fluid full-height">
      <div className="d-flex justify-content-center align-items-center full-height">
        <div className="card scorecard d-flex flex-column justify-content-center align-items-center">
          <p>Your Answers were Submitted</p>
          <button className="my-4 scbtn">View Score</button>
        </div>
      </div>
    </div>
  );
}

export default Score;
