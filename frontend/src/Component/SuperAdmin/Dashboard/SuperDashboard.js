import React, { useEffect, useState } from "react";
// import "./speradmin.css";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import pattern from "patternomaly";
// import source from "../../../data/data.json";

export function SuperDashboard() {
  const [company, setCompany] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeuser, setActiveuser] = useState([]);
  const [monthly, setmonthly] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [companyCount, setCompanyCount] = useState();
  const [subscribersCount, setSubscribersCount] = useState();
  const [companyEnrollment, setCompanyEnrollment] = useState(0);
  const [selfEnrollment, setSelfEnrollment] = useState(0);
  const [activeUserCount,setActiveUserCount] = useState({
    selfActiveUser:"",
    companyActiveUser:""
  })

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    // Company Count
    fetch(`${process.env.REACT_APP_API_URL}superadmin/companycount`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCompanyCount(data.totalCompanies);
      });

    // Company Indepth Details
    fetch(`${process.env.REACT_APP_API_URL}superadmin/companydetails`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompany(data);
      });

    // Company enroll count
    fetch(`${process.env.REACT_APP_API_URL}superadmin/enrollcount`)
      .then((res) => res.json())
      .then((data) => setSubscribersCount(data.subscribedUsers));

    // subscribers data
    fetch(`${process.env.REACT_APP_API_URL}superadmin/subscribersdata`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubscribers(data);
      });

    fetch(`${process.env.REACT_APP_API_URL}superadmin/activeusersdata`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setActiveuser(data)
      });

    fetch(`${process.env.REACT_APP_API_URL}superadmin/revenuedata`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRevenue(data[0]);
      });

    fetch(`${process.env.REACT_APP_API_URL}superadmin/monthlyprogress`)
      .then((res) => res.json())
      .then((data) => setmonthly(data));

    fetch(
      `${process.env.REACT_APP_API_URL}superadmin/enrollmentcountcomandself`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelfEnrollment(data.self_enrollment_count);
        setCompanyEnrollment(data.company_enrollment_count);
      });

      fetch(`${process.env.REACT_APP_API_URL}superadmin/activeforseperate`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setActiveUserCount({
          selfActiveUser:data.self_active_users,
          companyActiveUser:data.company_active_users
        })
      })

  }, []);

  return (
    <>
      <div class="container-fluid">
        {/* <!-- Header --> */}
        <header class="bg-surface-primary border-bottom pt-6">
          <div class="container-fluid">
            <div class="mb-npx">
              <div class="row ">
                <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                  {/* <!-- Title --> */}
                  <h1 class="h2 mb-0 ls-tight">
                    Hi, <span style={{ color: "#DC3545" }}> Dr.Ken</span>
                  </h1>
                </div>
                {/* <!-- Actions --> */}
              </div>
              {/* <!-- Nav --> */}
              {/* <ul class="nav nav-tabs mt-4 overflow-x border-0">
                                <li class="nav-item ">
                                    <a href="#" class="nav-link active">All files</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link font-regular">Shared</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link font-regular">File requests</a>
                                </li>
                            </ul> */}
            </div>
          </div>
        </header>
        {/* <!-- Main --> */}
        <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
            {/* <!-- Card stats --> */}
            <div class="row g-6 mb-6">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2 ">
                          Organization
                        </span>
                        <span class="h3 font-bold mb-0">{companyCount}</span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                          <i class="bi bi-credit-card"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Subscribers
                        </span>
                        <span class="h3 font-bold mb-0">
                          {subscribersCount}
                        </span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="">
                      <span>Company: {companyEnrollment}</span>
                      <br/>
                      <span>Self: {selfEnrollment}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Revenue
                        </span>
                        <span class="h3 font-bold mb-0">
                          ${revenue.total_amount}
                        </span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex">
                      <span>
                        Company ${revenue.business_registration_amount}
                      </span>
                      <span>Self-User ${revenue.self_registration_amount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card shadow border-0 h-100">
                  <div className="overline"></div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h6 font-semibold text-muted text-sm d-block mb-2">
                          Active User
                        </span>
                        <span class="h3 font-bold mb-0">
                          {activeuser.length}
                        </span>
                      </div>
                      <div class="col-auto">
                        <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                          <i class="bi bi-people"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="">
                      <span>Company: {activeUserCount.companyActiveUser}</span>
                      <br/>
                      <span>Self: {activeUserCount.selfActiveUser}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3>Organization</h3>
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div class="table-responsive">
                  <table class="table table-hover table-nowrap">
                    <thead class="bg-white text-light">
                      <tr>
                        <th className="text-light" scope="col">
                          Company Name
                        </th>
                        <th className="text-light" scope="col">
                          Email
                        </th>
                        <th className="text-light" scope="col">
                          Phone Number
                        </th>
                        <th className="text-light" scope="col">
                          Purchased Licence
                        </th>
                        <th className="text-light" scope="col">
                          Used Licence
                        </th>
                        <th className="text-light" scope="col">
                          Amount
                        </th>
                        {/* <th scope="col">Point</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {company.map((value, index) => (
                        <tr>
                          <td>
                            {/* <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" class="avatar avatar-sm rounded-circle me-2"/> */}
                            <a
                              class="text-heading font-semibold text-decoration-none"
                              href="#"
                            >
                              {value.company_name}
                            </a>
                          </td>
                          <td>{value.spoc_email_id}</td>
                          <td>{value.spoc_phone_number}</td>
                          <td>{value.total_licences}</td>
                          <td>{`${value.total_licences - value.license}`}</td>
                          <td>{value.total_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-6  shadow card1 ">
                <Bar
                  className="col-lg-12  p-1"
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Total Revenu",
                        data: monthly.map((data) => data.monthly_revenue),
                        borderRadius: 20,
                        // backgroundColor:"#8f231b",
                        backgroundColor: pattern.draw(
                          "diagonal-right-left",
                          "#8f231b"
                        ),
                        borderWidth: 15,
                      },
                    ],
                  }}
                  options={{
                    animation: {
                      duration: 2000,
                      delay: 30,
                    },
                    scales: {
                      y: {
                        grid: {
                          display: false,
                          color: "red",
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                          color: "red",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <h3>Subscribers</h3>
          <br />
          <div class="table-responsive">
            <table class="table table-hover table-nowrap">
              <thead class="bg-white">
                <tr>
                  <th scope="col" className="text-light">
                    Name
                  </th>
                  <th scope="col" className="text-light">
                    Enrollment_date
                  </th>
                  <th scope="col" className="text-light">
                    No. of modlule completed
                  </th>
                  <th scope="col" className="text-light">
                    Completed percentage
                  </th>
                  {/* <th scope="col">Point</th> */}
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((value, index) => (
                  <tr>
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        class="avatar avatar-sm rounded-circle me-2"
                      />
                      <a
                        class="text-heading font-semibold text-decoration-none"
                        href="#"
                      >
                        {value.first_name}
                      </a>
                    </td>
                    <td>
                      {new Date(value.enrollment_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td>{value.completed_modules}</td>
                    <td>
                      <ProgressBar
                        completed={Math.round(value.completion_percentage)}
                        bgColor="#8f231b"
                        animateOnRender="true"
                        transitionDuration="1s"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <h3>Active user</h3>
          <br />
          <div class="table-responsive">
            <table class="table table-hover table-nowrap">
              <thead class="bg-white">
                <tr>
                  <th scope="col" className="text-light">
                    Name
                  </th>
                  <th scope="col" className="text-light">
                    Enrollment_date
                  </th>
                  <th scope="col" className="text-light">
                    No. of modlule completed
                  </th>
                  <th scope="col" className="text-light">
                    Completed percentage
                  </th>
                  {/* <th scope="col">Point</th> */}
                </tr>
              </thead>
              <tbody>
                {activeuser.map((value, index) => (
                  <tr>
                    <td>
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        class="avatar avatar-sm rounded-circle me-2"
                      />
                      <a
                        class="text-heading font-semibold text-decoration-none"
                        href="#"
                      >
                        {value.first_name}
                      </a>
                    </td>
                    <td>
                      {new Date(value.enrollment_date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td>{value.completed_modules}</td>
                    <td>
                      <ProgressBar
                        completed={Math.round(value.completion_percentage)}
                        bgColor="#8f231b"
                        animateOnRender="true"
                        transitionDuration="1s"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
