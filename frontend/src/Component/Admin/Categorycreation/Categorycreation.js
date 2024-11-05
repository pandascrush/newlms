import React, { useState, useEffect } from "react";
import "./Categorycreation.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function Categorycreation() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        const fetchedCategories = res.data.result.map((category) => ({
          name: category.course_category_name,
          id: category.course_category_id,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return; // Check if newCategory is empty

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (
          response.data.message === "Quiz and context created successfully."
        ) {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
          setShowInput(false); // Hide input after successful addition
          setNewCategory(""); // Clear the input field
        }
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
      <div
        className="card p-4 crdcolorforcard"
        style={{ width: "600px", height: "400px" }}
      >
        <h4 className="text-center mb-5">Course Category Creation</h4>
        <div className="d-flex align-items-center">
          <select className="form-select">
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className="ms-2 plusbtn"
            onClick={() => setShowInput(!showInput)}
          >
            +
          </button>
        </div>

        {showInput && (
          <div className="mt-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="form-control"
            />
            <button
              className="btnaddcategory mt-2 rounded-2"
              onClick={handleAddCategory}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorycreation;
