import React, { useState } from "react";
import axios from "axios";
import "./CompanyRegister.css";
import { Link } from "react-router-dom";
import loginim from "../../../Asset/logimg.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    country: "",
    zipcode: "",
    companyPhone: "",
    spocName: "",
    spocEmail: "",
    spocPhone: "",
    companySize: "",
    companyType: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailPattern = /^[a-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phnovalidate = /^[0-9]{7,15}$/;
  const fullnamePattern = /^[a-zA-Z0-9\s]{2,}$/; // At least 2 characters and only letters and spaces
  const companysizepattern = /^[0-9]+$/; // Only numbers for company size
  const zipcodePattern = /^[0-9]{5,10}$/; // Assuming US zip code format (5-10 digits)
  const companytypepattern = /^[a-zA-Z\s]{2,}$/;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form inputs
  const validate = () => {
    let isValid = true;
    let formErrors = {};

    if (!formData.companyName) {
      formErrors.companyName = "Company Name is required";
    } else if (!fullnamePattern.test(formData.companyName)) {
      formErrors.companyName = "Enter valid Company Name";
      isValid = false;
    }

    if (!formData.companyEmail) {
      formErrors.companyEmail = "Company Email is required";
    } else if (!emailPattern.test(formData.companyEmail)) {
      formErrors.companyEmail = "Invalid email format.";
      isValid = false;
    }

    if (!formData.spocName) {
      formErrors.spocName = "SPOC Name is required";
    } else if (!fullnamePattern.test(formData.spocName)) {
      formErrors.spocName =
        "Invalid SPOC name. Only letters and spaces are allowed, minimum 2 characters.";
      isValid = false;
    }
    // if (!formData.spocEmail){
    //   formErrors.spocEmail = "SPOC Email is required";
    // } else if (!emailPattern.test(spocEmail)) {
    //   formErrors.spocEmail = "Invalid SPOC email format.";
    //   isValid = false;
    // }

    if (!formData.spocEmail) {
      formErrors.spocEmail = "SPOC Email is required";
    } else if (!emailPattern.test(formData.spocEmail)) {
      formErrors.spocEmail = "Invalid SPOC email format.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
      isValid = false;
    }
    if (!formData.companyPhone) {
      formErrors.companyPhone = "Company Phone is required";
      isValid = false;
    } else if (!phnovalidate.test(formData.companyPhone)) {
      formErrors.companyPhone = "Invalid Phone number";
      isValid = false;
    }
    if (!formData.spocPhone) {
      formErrors.spocPhone = "SPOC Phone number is required.";
      isValid = false;
    } else if (!phnovalidate.test(formData.spocPhone)) {
      formErrors.spocPhone = "Invalid SPOC Phone number. Must be 7-15 digits.";
      isValid = false;
    }
    if (!formData.country) {
      formErrors.country = "Country is required.";
    }
    if (!formData.zipcode) {
      formErrors.zipcode = "Zipcode is required.";
    } else if (!zipcodePattern.test(formData.zipcode)) {
      formErrors.zipcode = "Invalid Zipcode. Must be 5-10 digits.";
      isValid = false;
    }
    if (!formData.companySize) {
      formErrors.companySize = "Company Size is required.";
    } else if (!companysizepattern.test(formData.companySize)) {
      formErrors.companySize = "Invalid company size. Must be a number.";
      isValid = false;
    }

    if (!formData.companyType) {
      formErrors.companyType = "Company Type is required.";
    } else if (!companytypepattern.test(formData.companyType)) {
      formErrors.companyType = "Invalid company type.";
      isValid = false;
    }

    // Add more validation logic as needed

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Map the form data to the expected backend format
    const mappedData = {
      company_name: formData.companyName,
      company_email_id: formData.companyEmail,
      country: formData.country,
      zipcode: formData.zipcode,
      company_phone_number: formData.companyPhone,
      spoc_name: formData.spocName,
      spoc_email_id: formData.spocEmail,
      spoc_phone_number: formData.spocPhone,
      company_size: formData.companySize,
      company_type: formData.companyType,
      password: formData.password,
    };

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}auth/business_register`,
          mappedData
        )
        .then((res) => {
          console.log(res);
          if (res.data.message === "Business registered successfully") {
            alert("Registered successfully");
          } else if (
            res.data.message === "Company email domain is already registered."
          ) {
            alert("Company email domain is already registered.");
          }
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row p-3 p-md-0">
        <div className="col-lg-4 d-none d-lg-block p-0 m-0">
          <img src={loginim} className="login-image1" alt="Login" />
        </div>
        <div className="col-lg-8 col-sm-12">
          <h2 className="text-center py-2">Sign Up</h2>
          <p className="logpara text-center">How can we help you today?</p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="companyName" className="text-start">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.companyName && (
                    <p className="error-text text-start">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="companyEmail" className="text-start">
                    Company Email
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    id="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    className="frmcontrol"
                    placeholder="Enter your company email"
                  />
                  {errors.companyEmail && (
                    <p className="error-text text-start">
                      {errors.companyEmail}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="text-start">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  <p className="error-text text-start">{errors.country}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="zipcode" className="text-start">
                    Zipcode
                  </label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  <p className="error-text text-start">{errors.zipcode}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="companyPhone" className="text-start">
                    Company Phone Number
                  </label>
                  <input
                    type="text"
                    name="companyPhone"
                    id="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.companyPhone && (
                    <p className="error-text text-start">
                      {errors.companyPhone}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="spocName" className="text-start">
                    SPOC Name
                  </label>
                  <input
                    type="text"
                    name="spocName"
                    id="spocName"
                    value={formData.spocName}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.spocName && (
                    <p className="error-text text-start">{errors.spocName}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="spocEmail" className="text-start">
                    SPOC Email
                  </label>
                  <input
                    type="email"
                    name="spocEmail"
                    id="spocEmail"
                    value={formData.spocEmail}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.spocEmail && (
                    <p className="error-text text-start">{errors.spocEmail}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="spocPhone" className="text-start">
                    SPOC Phone Number
                  </label>
                  <input
                    type="text"
                    name="spocPhone"
                    id="spocPhone"
                    value={formData.spocPhone}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.spocPhone && (
                    <p className="error-text text-start">{errors.spocPhone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="companySize" className="text-start">
                    Company Size
                  </label>
                  <input
                    type="text"
                    name="companySize"
                    id="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.companySize && (
                    <p className="error-text text-start">
                      {errors.companySize}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="companyType" className="text-start">
                    Company Type
                  </label>
                  <input
                    type="text"
                    name="companyType"
                    id="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="frmcontrol"
                  />
                  {errors.companyType && (
                    <p className="error-text text-start">
                      {errors.companyType}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="text-start">
                    Password
                  </label>
                  <div className="d-flex">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="frmcontrol"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      style={{ cursor: "pointer" }} // Optional styling
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
                      {/* Show the correct icon */}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="error-text text-start">{errors.password}</p>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary my-4">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="logtext">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegister;
