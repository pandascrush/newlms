import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState({
    first_name: "",
    phone: "",
    profession: "",
    profile_image: null, // Initialize as null for file handling
  });
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data
    axios
      .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          phone: userData.phone,
          profession: userData.profession || "Student",
          profile_image: userData.profile_image,
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image") {
      setUser((prevState) => ({
        ...prevState,
        profile_image: files[0], // Store the file object
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value, // Update phone and profession
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append updated fields to FormData
    formData.append("first_name", user.first_name); // No change for first_name
    formData.append("phone", user.phone);
    formData.append("profession", user.profession);
    if (user.profile_image) {
      formData.append("profile_image", user.profile_image); // Append the file if present
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/updateprofile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set correct header for file upload
          },
        }
      );
      console.log(response.data.message); // Log success message
      // Optionally, handle success (like redirecting or showing a success alert)
      if (response.data.message === "User updated successfully.") {
        alert("User updated successfully.");
      }
    } catch (error) {
      console.error("Error updating profile:", error); // Log any errors
      // Optionally, handle error (like showing an error alert)
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <h2 style={{color:"#001040"}}>Edit Profile</h2>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="first_name"
            value={user.first_name}
            disabled // No onChange for first name
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange} // Allows updating the phone number
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profession" className="form-label">
            Profession
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="profession"
            name="profession"
            value={user.profession}
            onChange={handleChange} // Allows updating the profession
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profile_image" className="form-label">
            Profile Image
          </label>
          <input
            type="file"
            className="form-control form-control-sm"
            id="profile_image"
            name="profile_image"
            onChange={handleChange} // Allows updating the profile image
          />
        </div>

        <button type="submit" style={{backgroundColor:"#001040",color:"white"}} className="btn btn-sm">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
