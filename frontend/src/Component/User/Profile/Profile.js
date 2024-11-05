import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
import pattern from "patternomaly";
import ProgressBar from "@ramonak/react-progress-bar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons"; // You can replace with faEdit if needed
import face from "../../../Asset/Sibu.jpg";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function Indiviualdashboardmain() {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    profile_image: "",
    completion_percentage: 0,
  });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [assessmentLogs, setAssessmentLogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({ title: "", date: "" });
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const getWeekDays = (startDate) => {
    const startOfWeek = moment(startDate).startOf("week");
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: startOfWeek.format("ddd"),
        date: startOfWeek.format("YYYY-MM-DD"),
      });
      startOfWeek.add(1, "day");
    }
    return daysOfWeek;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          // last_name: userData.last_name.trim(),
          completion_percentage: parseFloat(userData.completion_percentage),
          profile_image: userData.profile_image || face, // Use default image if profile_image is not provided
          role: userData.profession || "Student", // Default to "Student" if role is not provided
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

  useEffect(() => {
    const weekDays = getWeekDays(selectedDate);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}user/userworkhour/${id}?weekStart=${weekDays[0].date}&weekEnd=${weekDays[6].date}`
      )
      .then((res) => {
        const workData = res.data;
        const hoursData = weekDays.map((day) => {
          const dayData = workData.find((item) => item.date === day.date);
          return dayData ? dayData.hours : 0;
        });
        setChartData({
          labels: weekDays.map((day) => `${day.day}`),
          datasets: [
            {
              label: "Working Hours",
              data: hoursData,
              backgroundColor: "#001040", // Update to the desired color
              borderWidth: 1,
            },
          ],
        });
        // console.log(weekDays);
      })
      .catch((err) => {
        console.log("Error fetching work hours data", err);
      });
  }, [id, selectedDate]);

  console.log(chartData);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/assessment-logs/${id}`)
      .then((res) => {
        const logs = res.data.logs;
        setAssessmentLogs(logs);
        const eventsData = logs
          .map((log) => {
            const eventList = [];
            if (log.pre_assessment) {
              eventList.push({ title: log.pre_assessment, date: log.date });
            }
            if (log.post_assessment) {
              eventList.push({ title: log.post_assessment, date: log.date });
            }
            return eventList;
          })
          .flat();
        setEvents(eventsData);
      })
      .catch((err) => {
        console.log("Error fetching assessment logs", err);
      });
  }, [id]);

  const handleEventClick = (info) => {
    setSelectedEvent({ title: info.event.title, date: info.event.startStr });
    setModalOpen(true); // Open modal
  };

  return (
    <>
      <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        {/* <div className="sidebar bg-light p-3">
          <h3 className="text-danger">My Spain Coach</h3>
          <ul className="list-unstyled">
            <li className="py-2">
              <a href="#" className="text-dark">
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-dark">
                Overview
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-dark position-relative">
                Messages{" "}
                <span className="badge bg-primary position-absolute top-0 start-100 translate-middle">
                  6
                </span>
              </a>
            </li>
          </ul>
          <a href="#" className="text-primary">
            Logout
          </a>
        </div> */}

        <header className="bg-surface-primary border-bottom pt-6">
          <div className="container-fluid">
            <div className="mb-npx">
              <div className="row align-items-center">
                <div className="col-sm-6 col-lg-12 mb-md-4 mb-sm-0">
                  <h1 className="h2 mb-0 ls-tight">
                    Hi,{" "}
                    <span style={{ color: "#DC3545" }}>
                      {user.first_name} {user.last_name}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="row g-4 m-3">
          <div className="col-sm-12 col-lg-6" style={{ width: "550px" }}>
            <div className="bg-white shadow p-4 rounded-4">
              <div className="text-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control custom-date-picker mx-auto" // Use custom class
                />
              </div>

              <Bar
                key={JSON.stringify(chartData)}
                data={chartData}
                options={{
                  animation: { duration: 2000, delay: 30 },
                  scales: {
                    y: {
                      type: "linear", // Ensure this is correct
                      beginAtZero: true,
                      title: { display: true, text: "Hours", color: "#000000" },
                      grid: { display: false },
                      ticks: { color: "black" },
                    },
                    x: {
                      title: { display: true, text: "Days", color: "#000000" },
                      grid: { display: false },
                      ticks: { color: "black" },
                    },
                  },
                  plugins: {
                    legend: { labels: { color: "white" } },
                    tooltip: {
                      titleColor: "white",
                      bodyColor: "white",
                    },
                    datalabels: {
                      display: false, // Disable the labels inside the bars
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="col-sm-12 col-lg-5">
            <div
              className="card rounded-4 p-4 text-center position-relative"
              style={{ height: "350px" }}
            >
              {/* Settings/Edit Icon */}
              <Link
                to={`/user/${id}/editprofile`} // Replace with the desired route
                className="position-absolute top-0 end-0 p-2"
                style={{ fontSize: "20px", color: "#DC3545" }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>

              <div className="d-flex align-items-center justify-content-center mb-3">
                <img
                  src={user.profile_image ? user.profile_image : face}
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="mb-2">
                <h5 className="mb-0">
                  {user.first_name} {user.last_name}
                </h5>
                <p className="mb-1">{user.role}</p>
              </div>
              <p className="mb-0">Course Completion</p>
              <ProgressBar
                completed={user.completion_percentage}
                bgColor="#DC3545"
              />
            </div>
          </div>

          <div className="col-sm-12 col-lg-12">
            <div className="card shadow rounded-4 p-4 text-dark text-decoration-none">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          id="eventModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="eventModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="eventModalLabel">
                  Event Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4>{selectedEvent.title}</h4>
                <p>{selectedEvent.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bootstrap JS (Optional) */}
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
}
