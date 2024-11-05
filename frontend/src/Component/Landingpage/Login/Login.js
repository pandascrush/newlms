import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import imlogin from "../../../Asset/bannerlog.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Modal state
  const navigate = useNavigate();

  const emailPattern = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInput = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else if (!emailPattern.test(username)) {
      setUsernameError("Invalid email format");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const loginData = { email: username, password };

    try {
      setIsLoading(true); // Start loading
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/login`, loginData, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);

          if (res.data.message === "Invalid email or password") {
            toast.error("Invalid Email or password");
          } else if (res.data.message === "login success") {
            const { user, token } = res.data;
            const { role_id, user_id, company_id, email } = user;
            if (role_id === 4) {
              navigate(`/user/${user_id}`);
            } else if (role_id === 5) {
              navigate(`/admindashboard/${company_id}/dashboard`);
            } else if (role_id === 2) {
              navigate(`/instructordashboard/${user_id}/courselist`);
            } else if (email === "admin@gmail.com") {
              navigate(`/superadmin/${user_id}/dashboard`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false); // Close the modal
  };

  const handleIndividualLogin = () => {
    navigate("/register");
  };

  const handleBusinessLogin = () => {
    navigate("/business_register");
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-0 m-0">
        <div className="col-lg-5 d-none d-lg-block p-0 m-0">
          <img src={imlogin} className="login-image" alt="Login Banner" />
        </div>
        <div className="col-lg-7 col-sm-12">
          <div className="LoginApp">
            <ToastContainer />
            <div className="px-1">
              <div className="login-form">
                <h1 className="text-center">Sign In</h1>
                <p className="logpara">How can we help you today?</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username" className="text-start">
                      Email
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`frmcontrol ${
                        usernameError ? "error-input" : ""
                      }`}
                    />
                    {usernameError && (
                      <div className="error-text text-start">
                        {usernameError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-start">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`frmcontrol ${
                        passwordError ? "error-input" : ""
                      }`}
                    />
                    {passwordError && (
                      <div className="error-text text-start">
                        {passwordError}
                      </div>
                    )}
                    <div className="d-flex justify-content-between mt-1">
                      <a href="/forgot-password" className="passlink">
                        Between 8 and
                        <br />
                        72 characters
                      </a>
                      <a
                        href="/forgot-password"
                        className="forget-password-link"
                      >
                        Forget Password?
                      </a>
                    </div>
                  </div>
                  <div className="form-group button-container">
                    <button
                      type="submit"
                      className="rounded-3 subbtn1"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Sign In"}
                    </button>
                  </div>
                  <p className="text-center">
                    Don't have an account?{" "}
                    <span
                      className="register-link fw-bold"
                      onClick={handleRegisterClick}
                    >
                      Register
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Register Selection */}
      <Modal show={showRegisterModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Account Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please select the type of account you want to create:</p>
          <div className="d-flex justify-content-around">
            <Button variant="primary" onClick={handleIndividualLogin}>
              Individual
            </Button>
            <Button variant="secondary" onClick={handleBusinessLogin}>
              Business
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
