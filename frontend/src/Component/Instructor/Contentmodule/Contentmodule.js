import React, { useState } from "react";
import "./Contentmodule.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const images = [
  {
    src: "https://img.freepik.com/free-photo/logo-designer-working-computer-desktop_23-2149142108.jpg",
    title: "Lesson1",
  },
  {
    src: "https://img.freepik.com/free-photo/asian-smiling-woman-wearing-glasses-using-laptop_171337-2132.jpg",
    title: "Lesson2",
  },
  {
    src: "https://img.freepik.com/free-photo/woman-retoucher-looking-camera-smiling-sitting-creative-design-media-agency_482257-18196.jpg",
    title: "Lesson3",
  },
  {
    src: "https://img.freepik.com/free-photo/top-view-illustrator-drawing-ipad_23-2150040090.jpg",
    title: "Lesson4",
  },
  {
    src: "https://img.freepik.com/free-vector/mobile-ui-ux-concept-illustration_114360-11697.jpg?t=st=1722937608~exp=1722941208~hmac=b92f0500c401c1f9c8fa7d6b2fe7923320aa4a35c3207ca0d20ffbbc3edbda49&w=900",
    title: "Lesson5",
  },
  {
    src: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051557.jpg?t=st=1722937561~exp=1722941161~hmac=6012c168d3a40c7881f5832d682277c62e5f46908a482b0cc67b62b0c8cd6dfc&w=900",
    title: "Lesson6",
  },
];

const itemsPerRow = 2;

function Contentmodule() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(images.length / itemsPerRow) - 1;
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  return (
    <div className="container-fluid">
      <div className="col-2 bg-info vh-100">
        <div className="dropdown mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Chapter 1
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" href="#chapter1-1">
                Subchapter 1.1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#chapter1-2">
                Subchapter 1.2
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col">
        <div id="chapter1-1" className="mt-3">
          <h2>Chapter 1.1 Content</h2>
          <p>This is the content for Subchapter 1.1</p>
        </div>
        <div id="chapter1-2" className="mt-3">
          <h2>Chapter 1.2 Content</h2>
          <p>This is the content for Subchapter 1.2</p>
        </div>
        <div className="mt-3">
          <h2>Chapter 2 Content</h2>
          <p>This is the content for Chapter 2</p>
        </div>
      </div>
    </div>
  );
}

export default Contentmodule;
