import React, { useEffect, useState } from "react";
import "./UpdateCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function UpdateCourse() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [courseData, setCourseData] = useState({
    courseFullName: "",
    courseShortName: "",
    courseStartDate: "",
    courseEndDate: "",
    courseImage: null,
    courseDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { course } = useParams();

  useEffect(() => {
    fetchCategories();
    fetchCourseData();
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

  console.log(courseData);

  const fetchCourseData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getcourse/${course}`)
      .then((res) => {
        const data = res.data.result[0];
        console.log(res.data.result[0]);

        setCourseData({
          courseFullName: data.coursename,
          courseShortName: data.course_short_name,
          courseStartDate: data.course_start_date, // Format to YYYY-MM-DD
          courseEndDate: data.course_end_date, // Format to YYYY-MM-DD
          courseImage: null, // Handle image separately
          courseDescription: data.course_desc,
        });
        setSelectedCategoryId(data.course_category_id); // Correctly set the selected category ID
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
        toast.error("Error fetching course data");
      });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory("");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}category/addcategory`, {
        course_category_name: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Category added successfully") {
          toast.success("Category added successfully");
          fetchCategories(); // Refresh the category list
        }
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable button

    const form = event.target;
    const courseImage = form.courseImage.files[0]; // Handle image separately
    const {
      courseFullName,
      courseShortName,
      courseStartDate,
      courseEndDate,
      courseDescription,
    } = courseData;

    // Validate required fields
    if (
      !courseFullName ||
      !courseShortName ||
      !courseStartDate ||
      !courseEndDate ||
      !courseImage ||
      !courseDescription ||
      !selectedCategoryId
    ) {
      toast.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for the API
    const formData = new FormData();
    formData.append("courseFullName", courseFullName);
    formData.append("courseShortName", courseShortName);
    formData.append("courseStartDate", courseStartDate);
    formData.append("courseEndDate", courseEndDate);
    formData.append("courseImage", courseImage);
    formData.append("courseDescription", courseDescription);
    formData.append("courseCategoryId", selectedCategoryId);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}course/updatecourse/${course}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.message === "Course updated successfully") {
        toast.success("Course updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h3 className="text-center mt-2">Update Course</h3>
      <div className="frmbg p-5 h-100 my-5 rounded-3">
        <form className="bg-light rounded-2 p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseFullName">Course Full Name</label>
              <input
                id="courseFullName"
                name="courseFullName"
                type="text"
                className="form-control"
                value={courseData.courseFullName}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseFullName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseShortName">Course Short Name</label>
              <input
                id="courseShortName"
                name="courseShortName"
                type="text"
                className="form-control"
                value={courseData.courseShortName}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseShortName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseCategory">Course Category</label>
              <select
                id="courseCategory"
                name="courseCategory"
                className="form-control"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                value={selectedCategoryId || ""}
              >
                <option value="">Select the course category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseStartDate">Course Start Date</label>
              <input
                id="courseStartDate"
                name="courseStartDate"
                type="date"
                className="form-control"
                value={courseData.courseStartDate}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseStartDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseEndDate">Course End Date</label>
              <input
                id="courseEndDate"
                name="courseEndDate"
                type="date"
                className="form-control"
                value={courseData.courseEndDate}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseEndDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseImage">Course Image</label>
              <input
                id="courseImage"
                name="courseImage"
                type="file"
                className="form-control"
                accept=".jpg, .jpeg"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                className="form-control"
                value={courseData.courseDescription}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    courseDescription: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="frmbutton rounded-1 p-2"
            value={isSubmitting ? "Updating..." : "Update Course"}
            disabled={isSubmitting} // Disable when submitting
          />
        </form>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Category</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateCourse;
