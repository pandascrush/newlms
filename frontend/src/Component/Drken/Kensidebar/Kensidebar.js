import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import sideicon3 from "../../../Asset/Vector.png";
import "./Kensidebar.css";

function Kensidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("quiz");
  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className={`col-auto ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
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
            <p className="my-4 sidetext p-2">
              <b>WHO AM I?</b>
            </p>
            <div className="card text-dark my-2 p-2 border-0 sideshadow">
              <Link
                to="#"
                className="sidebartext"
                onClick={() => handleContentChange("quiz")}
              >
                <img
                  src={sideicon1}
                  className="mx-1 text-dark"
                  alt="Pre-Assessment"
                />
                Pre-Assessment
              </Link>
            </div>
            <div className="card text-dark my-2 p-2 border-0 sideshadow">
              <Link
                to="/videos"
                className="sidebartext"
                onClick={() => handleContentChange("image")}
              >
                <img
                  src={sideicon2}
                  className="mx-1 text-dark"
                  alt="Who am I?"
                />
                Who am I?
              </Link>
            </div>
            <div className="card text-dark my-2 p-2 border-0 sideshadow">
              <Link
                to="#"
                className="sidebartext"
                onClick={() => handleContentChange("quiz")}
              >
                <img
                  src={sideicon3}
                  className="mx-1 text-dark"
                  alt="Post Assessment"
                />
                Post Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kensidebar;
