import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Module.css";
function Module() {
  const { id } = useParams();

  return (
    <div className="d-flex justify-content-between p-3 gap-3 modpart">
      <Link
        className="btn"
        style={{ backgroundColor: "#001040", color: "white" }}
        to={`/instructordashboard/${id}/addmodule`}
      >
        Add New Module
      </Link>
      <br></br>
      <Link
        style={{ backgroundColor: "#001040", color: "white" }}
        className="btn"
        to={`/instructordashboard/${id}/updatemodule`}
      >
        Update Module
      </Link>
    </div>
  );
}

export default Module;
