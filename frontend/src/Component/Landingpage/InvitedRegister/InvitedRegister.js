import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./InvitedRegister.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loginim from "../../../Asset/logimg.png";

function InvitedRegister() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [otherProfession, setOtherProfession] = useState(""); // State to store other profession
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password

  const {id} = useParams()
  const decodedId = btoa(id)

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emailPattern = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInput = () => {
    let isValid = true;
    const newErrors = {};

    // Full name validation
    if (!fullname) {
      newErrors.fullname = "Full Name is required";
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone number validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    // Qualification validation
    if (!qualification) {
      newErrors.qualification = "Qualification is required";
      isValid = false;
    }

    // If 'Other' is selected, validate the input for 'other profession'
    if (jobStatus === "Other" && !otherProfession) {
      newErrors.otherProfession = "Please specify your profession";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const registrationData = {
      fullname,
      email,
      phone_no: phone,
      qualification,
      jobStatus: jobStatus === "Other" ? otherProfession : jobStatus, // If Other is selected, send the other profession
      password,
    };
    console.log(registrationData);

    try {
      setIsLoading(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/invited_register/${id}`, registrationData)
        .then((res) => {
            console.log(res);
            
          if (res.data.message === "User registered and enrolled successfully.") {
            toast.success("Registration successful!");
            // navigate("/login");
            setFullname("");
            setEmail("");
            setPhone("");
            setQualification("");
            setJobStatus("");
            setOtherProfession("");
            setPassword("");
            setConfirmPassword("");
          } else if (
            res.data.message === "Registration failed. Please try again."
          ) {
            toast.error("Registration failed. Please try again.");
          } else if (
            res.data.message === "Email already exists in User table."
          ) {
            toast.error("user already registered");
          } else if (
            res.data.message === "Email already exists in Auth table."
          ) {
            toast.error("user already registered");
          }
        });
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-0 m-0">
        <div className="col-lg-5 d-none d-lg-block p-0 m-0">
          <img src={loginim} className="login-image1" alt="Login" />
        </div>
        <div className="col-lg-7 col-sm-12">
          <div className="RegisterApp">
            <ToastContainer />
            <div>
              <div className="register-form">
                <h1 className="text-center py-4">Sign Up</h1>
                <p className="logpara">How can we feel to help better today?</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullname" className="text-start">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your full name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className={`frmcontrol ${
                        errors.fullname ? "error-input" : ""
                      }`}
                    />
                    {errors.fullname && (
                      <div className="error-text text-start">
                        {errors.fullname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="text-start">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`frmcontrol ${
                        errors.email ? "error-input" : ""
                      }`}
                    />
                    {errors.email && (
                      <div className="error-text text-start">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="text-start">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`frmcontrol ${
                        errors.phone ? "error-input" : ""
                      }`}
                    />
                    {errors.phone && (
                      <div className="error-text text-start">
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="qualification" className="text-start">
                      Qualification
                    </label>
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      placeholder="Enter your qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className={`frmcontrol ${
                        errors.qualification ? "error-input" : ""
                      }`}
                    />
                    {errors.qualification && (
                      <div className="error-text text-start">
                        {errors.qualification}
                      </div>
                    )}
                  </div>

                  {/* Job Status Dropdown */}
                  <div className="form-group">
                    <label htmlFor="jobStatus" className="text-start">
                      Proffesion
                    </label>
                    <select
                      id="jobStatus"
                      name="jobStatus"
                      value={jobStatus}
                      onChange={(e) => setJobStatus(e.target.value)}
                      className="frmcontrol"
                    >
                      <option value="">Select Job Status</option>
                      <option value="Student">Student</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Employee">Employee</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Show input field if "Other" is selected */}
                  {jobStatus === "Other" && (
                    <div className="form-group">
                      <label htmlFor="otherProfession" className="text-start">
                        Specify Your Profession
                      </label>
                      <input
                        type="text"
                        id="otherProfession"
                        name="otherProfession"
                        placeholder="Enter your profession"
                        value={otherProfession}
                        onChange={(e) => setOtherProfession(e.target.value)}
                        className={`frmcontrol ${
                          errors.otherProfession ? "error-input" : ""
                        }`}
                      />
                      {errors.otherProfession && (
                        <div className="error-text text-start">
                          {errors.otherProfession}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="password" className="text-start">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`frmcontrol ${
                        errors.password ? "error-input" : ""
                      }`}
                    />
                    {errors.password && (
                      <div className="error-text text-start">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="text-start">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`frmcontrol ${
                        errors.confirmPassword ? "error-input" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <div className="error-text text-start">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="rounded-3 subbtn1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <p className="logpara">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", fontWeight: "600" }}
                      className="register-link"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitedRegister;
