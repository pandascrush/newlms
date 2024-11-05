import React, { useState, useEffect } from "react";
import "./MessageHistory.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessageHistory() {
  const [view, setView] = useState("compose");
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleViewChange = (viewType) => {
    setView(viewType);
    if (viewType === "history") {
      fetchMessageHistory();
    }
  };

  const handleRecipientChange = (type) => {
    setRecipients((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (recipients.length === 0 || !subject || !message) {
      setResponseMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    const res = {
      email: recipients.join(","), // Join selected recipients
      subject,
      message,
      user_id: id,
    };
    console.log(res);

    axios
      .post(`${process.env.REACT_APP_API_URL}user/composemessage`, {
        email: recipients.join(","), // Join selected recipients
        subject,
        message,
        user_id: id,
      })
      .then((res) => {
        setLoading(false); // Stop loading spinner

        if (
          res.data.message ===
          "Message sent and stored successfully to all recipients!"
        ) {
          toast.success("Message sent successfully to recipient!");
          setRecipients([]); // Clear recipients
          setSubject("");
          setMessage("");
        } else {
          alert(res.data.message); // Alert if message fails
        }
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false); // Stop loading spinner
      });
  };

  const fetchMessageHistory = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/getallmsg/` + id)
      .then((res) => {
        console.log(res);
        setMessageHistory(res.data.msg);
      })
      .catch((err) => {
        console.error("Error fetching message history:", err);
      });
  };

  return (
    <div className="message-container">
      <ToastContainer />
      <nav className="message-nav">
        <button
          className={`nav-btn ${view === "compose" ? "active" : ""}`}
          onClick={() => handleViewChange("compose")}
        >
          Compose Message
        </button>
        <button
          className={`nav-btn ${view === "history" ? "active" : ""}`}
          onClick={() => handleViewChange("history")}
        >
          Message History
        </button>
      </nav>

      <div className="message-content">
        {view === "compose" && (
          <div className="compose-form">
            <div className="form-group">
              <label className="text-start">Select Recipient</label>
              <div className="recipient-buttons">
                <button
                  className={`recipient-btn ${
                    recipients.includes("1") ? "active" : ""
                  }`}
                  onClick={() => handleRecipientChange("1")}
                >
                  <i className="fas fa-headset"></i> Support
                  {recipients.includes("1") && (
                    <i className="fas fa-check tick-icon"></i>
                  )}
                </button>

                <button
                  className={`recipient-btn ${
                    recipients.includes("2") ? "active" : ""
                  }`}
                  onClick={() => handleRecipientChange("2")}
                >
                  <i className="fas fa-chalkboard-teacher"></i> Instructor
                  {recipients.includes("2") && (
                    <i className="fas fa-check tick-icon"></i>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject-input" className="text-start">
                Subject
              </label>
              <input
                id="subject-input"
                type="text"
                className="form-control"
                placeholder="Enter subject"
                value={subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="text-start">
                Your Message
              </label>
              <textarea
                id="message-text"
                className="form-control message-textarea"
                placeholder="Write your message here..."
                value={message}
                onChange={handleMessageChange}
              ></textarea>
            </div>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
            {responseMessage && (
              <p className="response-msg">{responseMessage}</p>
            )}
          </div>
        )}

        {view === "history" && (
          <div className="history-table">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Sender Name</th>
                  <th>Subject</th>
                  <th>Receiver Email</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {messageHistory.length > 0 ? (
                  messageHistory.map((msg, index) => (
                    <tr key={msg.id}>
                      <td>{index + 1}</td>
                      <td>{msg.sender_name}</td>
                      <td>{msg.subject}</td>
                      <td>{msg.receiver_email}</td>
                      <td>{new Date(msg.timestamp).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageHistory;
