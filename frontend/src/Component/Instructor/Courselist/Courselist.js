import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import "./Courselist.css";

function Courselist() {
  const [course, setCourse] = useState([]);
  const [users, setUsers] = useState([]); // State for user data
  const [showTable, setShowTable] = useState(false); // State to control table visibility
  const navigate = useNavigate(); // Use the useNavigate hook
  const { id } = useParams(); // Use useParams to get the `id` from the URL
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getallcourse`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/getallusers`)
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users); // Store user data in state
        setActiveCount(res.data.activeUserCount);
      });
  }, []);

  // Function to handle card click and navigate to the desired page with courseId
  const handleCardClick = (courseId) => {
    navigate(`/instructordashboard/${id}/coursecreation/${courseId}`);
  };

  // Function to toggle table visibility
  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  // Function to determine row class based on user active status
  const getRowClass = (isActive) => {
    return isActive === 1 ? "active-user-row" : "inactive-user-row";
  };

  return (
    <div className="courselist-container">
      <h3 className="heading-center">Course Overview</h3>

      {/* Button to toggle user list table */}
      <button onClick={handleToggleTable} className="user-list-button">
        User List
      </button>

      <div className="course-cards-container">
        {course.map((e, index) => (
          <div className="course-card" key={index}>
            <div
              className="inner-card course-image-card"
              onClick={() => handleCardClick(e.courseid)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={e.course_image.replace(/\\/g, "/")}
                alt={e.coursename}
                className="course-image"
              />
              <h5 className="course-title text-start">{e.coursename}</h5>
            </div>

            <div className="inner-card course-details-card text-start">
              <h5 className="details-heading">Course Details</h5>
              <p className="details-text">
                <strong>Modules:</strong> {e.module_count} <br />
                <strong>Start Date:</strong>{" "}
                {new Date(e.course_start_date).toLocaleDateString()} <br />
                <strong>End Date:</strong>{" "}
                {new Date(e.course_end_date).toLocaleDateString()} <br />
                <strong>Created At:</strong>{" "}
                {new Date(e.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="inner-card user-stats-card text-start">
              <h5 className="stats-heading">User Statistics</h5>
              <p className="stats-text">
                <strong>Enrolled:</strong> {e.enrolled_user_count} <br />
                <strong>Completed:</strong> {e.completed_user_count} <br />
                <strong>
                  Active:{" "}
                  <strong style={{ color: "#001040" }}>
                    {activeCount} Learner{" "}
                  </strong>
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* User Table - Initially hidden */}
      {showTable && (
        <div className="user-table-container">
          <h3 className="heading-center">User List</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Profession</th>
                <th>Active</th> {/* New Active status column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className={getRowClass(user.isActive)}>
                  <td>{user.user_id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_no}</td>
                  <td>{user.qualification || "N/A"}</td>
                  <td>{user.profession || "N/A"}</td>
                  <td>{user.isActive === 1 ? "Active" : "Inactive"}</td>{" "}
                  {/* Display Active/Inactive */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Courselist;
