import React, { useState, useEffect } from "react";
import "./Drkenhome.css";
import { Link, useLocation } from "react-router-dom";
import Overview from "../Overview/Overview";
import Lessons from "../Lessons/Lessons";
import Instructors from "../Instructors/Instructors";
import icon1 from "../../../Asset/tabler_book1.png";
import icon3 from "../../../Asset/gravity-ui_person.png";
import icon2 from "../../../Asset/mingcute_time-line.png";
import frontgif from "../../../Asset/looping3.gif";
import axios from "axios";

function Drkenhome() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [count, setCount] = useState({
    moduleCount: "",
    enrolleCount: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/moduleandenrollcount`)
      .then((res) => {
        console.log(res.data);
        setCount({
          moduleCount: res.data.moduleCount,
          enrolleCount: res.data.enrollmentCount,
        });
      });
  }, []);

  useEffect(() => {
    if (location.pathname.includes("mycourses")) {
      setActiveTab("lessons");
    } else if (location.pathname.includes("instructor")) {
      setActiveTab("Instructor");
    } else {
      setActiveTab("overview");
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "Instructor":
        return <Instructors />;
      case "lessons":
        return <Lessons />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="container">
      <div
        className={
          activeTab === "lessons" ? "video-wrapper my-2" : "video-wrapper1 my-2"
        }
      >
        {activeTab === "lessons" ? (
          <iframe
            src="https://player.vimeo.com/video/984701898?autoplay=1&muted=1" // Replace with the actual video URL
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Lessons Video"
            // Adjust height as needed
          />
        ) : (
          <img src={frontgif} alt="Loading animation" className="rounded-5" />
        )}
      </div>
      {/* <div className="video-wrapper">
        <iframe
          src="https://player.vimeo.com/video/984701898"
          // src="https://drive.google.com/file/d/1iiNc0K6e4LaqTf-5Rpr0V7099XrSDsMs/view?usp=sharing"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo Video"
        ></iframe>
      </div> */}
      <div className="m-5">
        <h5 className="my-5 text-center" style={{ fontWeight: "600" }}>
          Introduction of My Spine Coach
        </h5>
      </div>
      <div className="row storypart mx-1">
        <div className="d-flex justify-content-center align-items-center lessontext">
          <div className="col text-center">
            <p className="iconpara fw-bold">
              <img
                src={icon1}
                className="mx-2"
                alt="18 Lessons"
                style={{ height: "24px" }}
              />
              {count.moduleCount} Lessons
            </p>
          </div>
          <div className="col text-center">
            <p className="fw-bold pt-2 iconpara">
              <img
                src={icon2}
                className="mx-2"
                alt="15 Hours"
                style={{ height: "24px" }}
              />
              15 Hours
            </p>
          </div>
          <div className="col text-center">
            <p className="fw-bold pt-2 iconpara">
              <img
                src={icon3}
                className="mx-2"
                alt="3,000 Enrolled"
                style={{ height: "24px" }}
              />
              {count.enrolleCount} Enrolled
            </p>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-sm-12 col-md-3 mx-1 mx-md-4 my-2">
            <Link
              to="#"
              style={{ fontWeight: "500", textDecoration: "none" }}
              onClick={() => setActiveTab("overview")}
              className={activeTab === "overview" ? "active-link" : ""}
            >
              Overview
            </Link>
          </div>

          <div className="col-sm-12 col-md-3 mx-1 mx-md-4 my-2">
            <Link
              to="#"
              style={{ fontWeight: "500", textDecoration: "none" }}
              onClick={() => setActiveTab("Instructor")}
              className={activeTab === "Instructor" ? "active-link" : ""}
            >
              AboutInstructor
            </Link>
          </div>
          <div className="col-sm-12 col-md-3 mx-1 mx-md-4 my-2">
            <Link
              to="#"
              style={{ fontWeight: "500", textDecoration: "none" }}
              onClick={() => setActiveTab("lessons")}
              className={activeTab === "lessons" ? "active-link" : ""}
            >
              Lessons
            </Link>
          </div>
        </div>
        <hr />
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Drkenhome;
