import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

export function Dashboard() {
  const [totallicense, setTotallicense] = useState("");
  const [learnerinvited, setLearnerinvited] = useState("");
  const [learnerjoiner, setLearnerjoiner] = useState("");
  var calculate = (learnerinvited / totallicense) * 100;
  var calculatejoiner = (learnerjoiner / learnerinvited) * 100;
  var { id } = useParams();
  const [learnerinvitedpercentage, setLearnerinvitedpercentage] =
    useState(calculate);
  const [learnerjoinerpercentage, setLearnerjoinerpercentage] =
    useState(calculatejoiner);
  const [spocname, setSpocname] = useState("");
  const [companyMail, setCompanyMail] = useState("");
  const [progress, setProgress] = useState([]);
  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/getspocname/${id}`)
      .then((res) => {
        console.log(res);
        setSpocname(res.data.spoc_name);
        setCompanyMail(res.data.company_email);
      });
  }, [id]);

  function handleInvite(event) {
    event.preventDefault();

    // Split the email list by commas and trim whitespace
    const emailArray = emailList.split(",").map((email) => email.trim());
    const key = {
      emails: emailList,
    };

    console.log(emailList);

    // Extract company domain from the companyEmail
    const companyDomain = companyMail.split("@")[1];

    // Check if the email list is empty
    if (emailArray.length === 0 || emailList === "") {
      alert("Please provide email addresses");
      return;
    }

    // Check if the number of emails exceeds the available licenses
    if (emailArray.length > totallicense) {
      alert(
        `Your available license is only ${totallicense}. You are trying to invite more than that. Please add more licenses.`
      );
      return;
    }

    // Check if each invited email ends with the company domain
    const invalidEmails = emailArray.filter(
      (email) => !email.endsWith(`@${companyDomain}`)
    );

    if (invalidEmails.length > 0) {
      alert(`All emails must end with @${companyDomain}`);
      return;
    }

    // Send the invitation request to the server
    axios
      .post(`${process.env.REACT_APP_API_URL}admin/invite_learners/${id}`, key)
      .then((res) => {
        console.log(res);
        if (
          res.data.message ===
          "Learners invited, licenses updated, and emails sent successfully"
        ) {
          alert("Mail sent successfully");
          window.location.reload();
        } else if (res.data.message === "All emails are already invited") {
          alert("Invite sent already for these emails");
        } else {
          alert("Failed to send mail");
        }
      })
      .catch((error) => {
        console.error("There was an error sending the invite:", error);
        alert("An error occurred. Please try again.");
      });
  }

  const [enrolledCount, setEnrolledCount] = useState(0);
  const [invitedUser, setInvitedUser] = useState(0);

  // Modal states for toggling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailList, setEmailList] = useState(""); // For collecting email input

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin/licensecount/${id}`)
      .then((res) => {
        setTotallicense(res.data.data.license);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}admin/invitecount/${id}`)
      .then((res) => {
        // console.log(res.data);
        setInvitedUser(res.data.invite_count);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}admin/enrolledcount/${id}`)
      .then((res) => {
        console.log(res.data);
        setEnrolledCount(res.data.matchingCount);
      });
  }, []);

  const [activeTable, setActiveTable] = useState(1);
  const changeTable = (tableNumber) => {
    setActiveTable(tableNumber);
  };

  const [activeData, setActiveData] = useState([]);
  const [inactiveData, setInactiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  useEffect(() => {
    const fetchUserStates = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}admin/userstates/${id}`
        );
        console.log(res.data);

        // setPaidUserCount(res.data.paidUsersCount);
        setActiveData(res.data.activeData);
        setInactiveData(res.data.inactiveData);
        setCompletedData(res.data.completedData);
        setLeaderBoardData(res.data.leaderBoardData);
      } catch (error) {
        console.error("Error fetching user states:", error);
      }
    };

    fetchUserStates();
  }, []);

  const renderTableData = () => {
    let dataToRender = [];

    switch (activeTable) {
      case 1:
        dataToRender = leaderBoardData;
        break;
      case 2:
        dataToRender = activeData;
        break;
      case 3:
        dataToRender = inactiveData;
        break;
      case 4:
        dataToRender = completedData;
        break;
      default:
        dataToRender = [];
    }

    return dataToRender.map((item, index) => (
      <tr key={index}>
        <td>{item.name.trim()}</td> {/* Use trim to remove any extra spaces */}
        <td>{item.date ? new Date(item.date).toLocaleString() : "N/A"}</td>{" "}
        <td>{item.modules}</td>
        <td>{item.percent}</td>
      </tr>
    ));
  };

  return (
    <>
      <div class="container-fluid">
        <header class="bg-surface-primary border-bottom pt-6">
          <div class="container-fluid">
            <div class="mb-npx">
              <div class="row align-items-center">
                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                  <h1 class="h2 mb-0 ls-tight">
                    Hi,{" "}
                    <span
                      style={{ color: "#DC3545", textTransform: "capitalize" }}
                    >
                      {spocname}
                    </span>
                  </h1>
                </div>
                {/* <!-- Actions --> */}
              </div>
            </div>
          </div>
        </header>
        {/* <!-- Main --> */}
        <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
            {/* <!-- Card stats --> */}
            <div class="row g-6 mb-6">
              <div class="col-xl-4 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2 ">
                          Total License
                        </span>
                        <span class="h3 font-bold mb-0">{totallicense}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                          <i class="bi bi-credit-card"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="mt-2 mb-0 text-sm">
                      <span class="badge badge-pill bg-soft-success text-success me-2">
                        {/* <i class="bi bi-arrow-up me-1"></i>13% */}
                      </span>
                      <Link to={`/admindashboard/${id}/purlicense`}>
                        <span class="textend">
                          <i class="bi bi-add me-1"></i>Add More License..
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Learners Invited
                        </span>
                        <span class="h3 font-bold mb-0">{invitedUser}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="mt-2 mb-0 text-sm">
                      <span class="badge badge-pill bg-primary text-white me-2 p-2">
                        Active: {activeData.length}
                      </span>
                      <span class="badge badge-pill bg-danger text-white me-2  p-2">
                        Inactive: {inactiveData.length}
                      </span>
                      <span class="badge badge-pill bg-soft-success text-success me-2 p-2">
                        completed: {completedData.length}
                      </span>
                      {totallicense === 0 ? (
                        <span className="product-sold-out textend">
                          Add License
                        </span>
                      ) : (
                        // <Link>
                        //   <span
                        //     class="textend"
                        //     data-bs-toggle="modal"
                        //     data-bs-target="#exampleModal"
                        //     disable={totallicense === 0}
                        //   >
                        //     Invite Learners..
                        //   </span>
                        // </Link>
                        <Link onClick={handleModalOpen}>
                          <span
                            class="textend"
                            // data-bs-toggle="modal"
                            // data-bs-target="#exampleModal"
                            disable={totallicense === 0}
                          >
                            Invite Learners..
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Learners Enrolled
                        </span>
                        <span class="h3 font-bold mb-0">{enrolledCount}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div class="mt-2 mb-0 text-sm">
                      <span class="badge badge-pill bg-soft-danger text-danger me-2">
                        <i class="bi bi-arrow-down me-1"></i>-
                        {learnerjoinerpercentage}%
                      </span>
                      <Link to={`/admindashboard/${id}/notenroll`}>
                        <span class="textend">Not Enrolled...</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-screen flex-grow-1 overflow-y-lg-auto">
              <main className="py-6 bg-surface-secondary">
                <div className="container-fluid">
                  <div className="card shadow border-0 mb-7">
                    <div className="card-header d-flex justify-content-between">
                      <Link
                        to="#"
                        className="mb-0 linktextclr"
                        onClick={() => changeTable(1)}
                      >
                        Leader Board
                      </Link>
                      <Link
                        to="#"
                        className="mb-0 linktextclr"
                        onClick={() => changeTable(2)}
                      >
                        Active
                      </Link>
                      <Link
                        to="#"
                        className="mb-0 linktextclr"
                        onClick={() => changeTable(3)}
                      >
                        Inactive
                      </Link>
                      <Link
                        to="#"
                        className="mb-0 linktextclr"
                        onClick={() => changeTable(4)}
                      >
                        Completed
                      </Link>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover table-nowrap">
                        <thead className="text-light">
                          <tr>
                            <th scope="col" style={{ color: "white" }}>
                              Name
                            </th>
                            <th scope="col" style={{ color: "white" }}>
                              Enrollment Date
                            </th>
                            <th scope="col" style={{ color: "white" }}>
                              No. of Modules Completed
                            </th>
                            <th scope="col" style={{ color: "white" }}>
                              Completed Percentage
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-light">{renderTableData()}</tbody>
                      </table>
                    </div>
                    <div class="card-footer border-0 py-5">
                      <span class="text-muted text-sm">
                        Showing 10 items out of 250 results found
                      </span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            {/* <div class="card shadow border-0 mb-7">
                    <div class="card-header d-flex justify-content-between">
                        <Link class="mb-0 linktextclr" onClick={() => changeTable(1)}>Leader Board</Link>
                        <Link class="mb-0 linktextclr" onClick={() => changeTable(2)}>Active</Link>
                        <Link class="mb-0 linktextclr" onClick={() => changeTable(3)}>Inactive</Link>
                        <Link class="mb-0 linktextclr" onClick={() => changeTable(4)}>completed</Link>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-nowrap">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">enrollment_date</th>
                                    <th scope="col">No. of modlule completed</th>
                                    <th scope="col">Completed percentage</th>   
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="card-footer border-0 py-5">
                        <span class="text-muted text-sm">Showing 10 items out of 250 results found</span>
                    </div>
                </div> */}
          </div>
        </main>
        {isModalOpen && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invite Learners</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleInvite}>
                    <textarea
                      className="form-control"
                      value={emailList}
                      onChange={(e) => setEmailList(e.target.value)}
                      placeholder="Enter email addresses separated by commas"
                      rows="3"
                    />
                    <p className="mt-2">
                      You may specify multiple email addresses by separating
                      them with commas.
                    </p>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleModalClose}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Invite
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
