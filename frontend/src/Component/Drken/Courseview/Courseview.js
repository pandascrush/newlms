import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Courseview.css";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import sideicon3 from "../../../Asset/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDown } from "react-icons/fa";

function Courseview() {
  const [questionData, setQuestionData] = useState(null);
  const now = 60;
  useEffect(() => {
    fetch("/quizdata.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestionData(data.quiz[0]); // Assuming the first question
      })
      .catch((error) => {
        console.error("Error fetching the quiz data:", error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-2">
          <p className="my-4 sidetext p-2">
            <b>WHO AM I?</b>
          </p>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">
              <img src={sideicon1} className="mx-1" />
              Pre-Assessment
            </Link>
          </div>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">
              <img src={sideicon2} className="mx-1" />
              Who am I?
            </Link>
          </div>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">
              <img src={sideicon3} className="mx-1" />
              Post Assessment
            </Link>
          </div>
        </div>
        <div className="col-8">
          <h4>Who am I?</h4>
          <div className="card quizpart p-2">
            <h4 className="sidetext">QUIZ :</h4>
            {questionData ? (
              <p>1. {questionData.question}</p>
            ) : (
              <p>Loading question...</p>
            )}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button className="rounded-2">
              <b>Previous</b>
            </button>
            <button className="rounded-2">
              <b>Next</b>
            </button>
          </div>
        </div>
        <div className="col-2">
          <div className="card d-flex justify-content-center">
            <ProgressBar
              now={now}
              label={`${now}%`}
              className="m-2 custom-progress-bar"
            />
            <div className="d-flex justify-content-around">
              <p>Overall Progress</p>
              <p>{now}%</p>
            </div>
          </div>

          <h5>Modules</h5>
          <p>0/4 Completed</p>
          <div className="d-flex">
            <div className="orangecircle d-flex flex-column justify-content-center align-items-center">
              <p className="m-2 numberclr">3</p>
            </div>
            <div className="card px-2 mx-3 rightcards border-0">
              Who Suffers?{" "}
              <FontAwesomeIcon icon={FaAngleDown} className="text-dark" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courseview;
