import React from "react";
import { Link, useParams } from "react-router-dom";

function QuestionPage() {
  const { id } = useParams();

  return (
    <div className="d-flex justify-content-between p-3 gap-3 modpart">
      <Link
        className="btn"
        style={{ backgroundColor: "#001040", color: "white" }}
        to={`/instructordashboard/${id}/addquestion`}
      >
        Add Questions
      </Link>
      <br></br>
      <Link
        style={{ backgroundColor: "#001040", color: "white" }}
        className="btn"
        to={`/instructordashboard/${id}/updatequestion`}
      >
        Update Question
      </Link>
    </div>
  );
}

export default QuestionPage;
