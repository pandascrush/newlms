import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

function Videocontent() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/cr");
  };
  return (
    <div className="container">
      <div className="m-4 py-5">
        <h4 className="coursechapter">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="clricon mx-2"
            onClick={handleNavigate}
          ></FontAwesomeIcon>
          Chapter 1:
        </h4>
        <div className="video-wrapper rounded-4 my-5">
          <iframe
            src="https://player.vimeo.com/video/984701898"
            width="900"
            height="600"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo Video"
            className="rounded-3"
          ></iframe>
        </div>
        <div className="d-flex justify-content-end">
          <button className="rounded-2 fw-bold" onClick={handleNavigate}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Videocontent;
