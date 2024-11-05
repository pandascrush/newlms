import React from "react";
import "./Modal1.css"; // Optional: You can create your own styles

const Modal1 = ({ isOpen, onClose, eventDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Event Details</h3>
        <p>
          <strong>Title:</strong> {eventDetails.title}
        </p>
        <p>
          <strong>Date:</strong> {eventDetails.date}
        </p>
        <button
          style={{ backgroundColor: "#001040", color: "white" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal1;
