import React from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseContentPage.css";
function CourseContentPage() {
  const { id } = useParams();

  return (
    <div className="d-flex justify-content-between modpart p-3 gap-3">
      <Link
        className="btn"
        style={{ backgroundColor: "#001040", color: "white" }}
        to={`/instructordashboard/${id}/addpagecontent`}
      >
        Add New Content
      </Link>
      <br></br>
      <Link
        style={{ backgroundColor: "#001040", color: "white" }}
        className="btn"
        to={`/instructordashboard/${id}/updatepagecontent`}
      >
        Update Content
      </Link>
    </div>
  );
}

export default CourseContentPage;
