import React from "react";
import Kensidebar from "../Kensidebar/Kensidebar";
// import QuestionDisplay from "../Coursevideos/Coursevideos";
import Coursevideos from "../Coursevideos/Coursevideos";

function Kencoursedashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Kensidebar />
        </div>
        <div className="col-10">
          <Coursevideos />
        </div>
      </div>
    </div>
  );
}

export default Kencoursedashboard;
