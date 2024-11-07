import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Icon } from "@mui/material";

function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Single category ID

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const top100Films = [
    { id: 1, title: "The Shawshank Redemption", year: 1994 },
    { id: 2, title: "The Godfather", year: 1972 },
    { id: 3, title: "The Godfather: Part II", year: 1974 },
    { id: 4, title: "The Dark Knight", year: 2008 },
    { id: 5, title: "12 Angry Men", year: 1957 },
    { id: 6, title: "Schindler's List", year: 1993 },
    { id: 7, title: "Pulp Fiction", year: 1994 },
    {
      id: 8,
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];

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
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCategory("");
  };
  const handleOpenModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
    setNewCategory(""); // Clear the category name after closing
  };

  const handleOpenModal2 = () => {
    setIsModalOpen2(true); // Use setIsModalOpen2 instead of setIsModalOpen1
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false); // Use setIsModalOpen2 instead of setIsModalOpen1
    setNewCategory(""); // Clear the category name after closing
  };

  const handleOpenModal3 = () => {
    setIsModalOpen3(true); // Use setIsModalOpen3 instead of setIsModalOpen1
  };

  const handleCloseModal3 = () => {
    setIsModalOpen3(false); // Use setIsModalOpen3 instead of setIsModalOpen1
    setNewCategory(""); // Clear the category name after closing
  };

  const handleOpenModal4 = () => {
    setIsModalOpen4(true); // Use setIsModalOpen4 instead of setIsModalOpen1
  };

  const handleCloseModal4 = () => {
    setIsModalOpen4(false); // Use setIsModalOpen4 instead of setIsModalOpen1
    setNewCategory(""); // Clear the category name after closing
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

  // Objective Field
  const [objective, setObjective] = useState([]);
  const [selectedObjectiveIds, setSelectedObjectiveIds] = useState([]);

  function fetchObjectives() {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/get-learning-objectives`)
      .then((res) => {
        // console.log(res);
        setObjective(res.data.learningObjectives);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchObjectives();
  }, []);

  // Handle changes in selection
  const handleObjectiveChange = (event, selectedOptions) => {
    // Extract the objectiveid values from the selected options
    const selectedIds = selectedOptions.map((option) => option.objectiveid);
    setSelectedObjectiveIds(selectedIds);
  };

  const handleAddCategory1 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}course/add-learning-objective`, {
        objective_text: newCategory,
      })
      .then((response) => {
        console.log(response);

        if (response.data.message === "Failed to add learning objective") {
          toast.error("Failed to add learning objective");
          fetchObjectives(); // Refresh the category list
        } else if (
          response.data.message === "Learning objective added successfully"
        ) {
          toast.success("Learning objective added successfully");
          fetchObjectives();
        }
        handleCloseModal1();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  // OutCome field
  const [outcome, setOutcome] = useState([]);
  const [selectedOutcomeIds, setSelectedOutcomeIds] = useState([]);

  function fetchOutcomes() {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/get-learning-outcomes`)
      .then((res) => {
        console.log(res);
        setOutcome(res.data.outcomes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchOutcomes();
  }, []);

  const handleOutcomeChange = (event, selectedOptions) => {
    // Extract the objectiveid values from the selected options
    const selectedIds = selectedOptions.map((option) => option.outcomeid);
    setSelectedOutcomeIds(selectedIds);
  };

  const handleAddCategory2 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}course/add-learning-outcomes`, {
        outcome_text: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Failed to add learning outcome") {
          toast.error("Failed to add learning outcome");
          fetchOutcomes();
        } else if (
          response.data.message === "Learning outcome added successfully"
        ) {
          toast.success("Learning outcome added successfully");
          fetchOutcomes();
        }
        handleCloseModal2(); // Close the modal specific to this function
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  // Pre-Requisite Field
  const [prerequisite, setPrerequisite] = useState([]);
  const [selectedPrerequisiteIds, setSelectedPrerequisiteIds] = useState([]);

  function fetchPrerequisites() {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/get-prerequisite`)
      .then((res) => {
        console.log(res);
        setPrerequisite(res.data.prerequisites);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPrerequisites();
  }, []);

  const handlePrerequisiteChange = (event, selectedOptions) => {
    // Extract the objectiveid values from the selected options
    const selectedIds = selectedOptions.map((option) => option.prerequisiteid);
    setSelectedPrerequisiteIds(selectedIds);
  };

  const handleAddCategory3 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}course/add-prerequisite`, {
        prerequisite_text: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Failed to add prerequisite") {
          toast.error("Failed to add prerequisite");
          fetchPrerequisites();
        } else if (
          response.data.message === "Prerequisite added successfully"
        ) {
          toast.success("Prerequisite added successfully");
          fetchPrerequisites();
        }
        handleCloseModal3(); // Close the modal specific to this function
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  // Learner Group Field
  const [learnergroup, setLearnergroup] = useState([]);
  const [selectedlearnergroupIds, setSelectedLearnergroupIds] = useState([]);

  function fetchLearnergroup() {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/get-learner-group`)
      .then((res) => {
        console.log(res);
        setLearnergroup(res.data.learner_group);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchLearnergroup();
  }, []);

  const handleLearnergroupChange = (event, selectedOptions) => {
    // Extract the objectiveid values from the selected options
    const selectedIds = selectedOptions.map((option) => option.learnergroupid);
    setSelectedLearnergroupIds(selectedIds);
  };

  const handleAddCategory4 = () => {
    if (newCategory.trim() === "") return;

    axios
      .post(`${process.env.REACT_APP_API_URL}course/add-learner-group`, {
        learner_group_text: newCategory,
      })
      .then((response) => {
        if (response.data.message === "Failed to add learning group") {
          toast.error("Failed to add learning group");
          fetchLearnergroup(); // Refresh the category list
        } else if (
          response.data.message === "Learning outcome added successfully"
        ) {
          toast.success("Learning outcome added successfully");
          fetchLearnergroup();
        }
        handleCloseModal4();
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
        toast.error("Error adding new category");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const courseFullName = form.courseFullName.value;
    const courseShortName = form.courseShortName.value;
    const courseStartDate = form.courseStartDate.value;
    const courseEndDate = form.courseEndDate.value;
    const courseImage = form.courseImage.files[0];
    const courseDescription = form.courseDescription.value;

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
      alert("All fields are required.");
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

    // Convert arrays to JSON strings and append to formData
    formData.append(
      "selectedObjectiveIds",
      JSON.stringify(selectedObjectiveIds)
    );
    formData.append("selectedOutcomeIds", JSON.stringify(selectedOutcomeIds));
    formData.append(
      "selectedPrerequisiteIds",
      JSON.stringify(selectedPrerequisiteIds)
    );
    formData.append(
      "selectedLearnergroupIds",
      JSON.stringify(selectedlearnergroupIds)
    );

    console.log(formData);

    try {
      // Send the form data to the backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}course/addcourse`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Course and context added successfully") {
        toast.success("Course added successfully");

        // Reset form fields
        form.reset();
        setSelectedCategoryId(null);
        setNewCategory("");
      } else {
        toast.error(response.data.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      <h3 className="text-center mt-2">Course Creation</h3>
      <div className="frmbg p-0 p-lg-5 h-100 my-5 rounded-3">
        <form className="bg-light rounded-2 p-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="courseFullName">Course Full Name</label>
              <input
                id="courseFullName"
                name="courseFullName"
                type="text"
                className="form-control"
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
                onChange={(e) => setSelectedCategoryId(e.target.value)} // Set single ID
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
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="learningobjective">Learning Objective</label>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={objective} // Use the objective state data
                disableCloseOnSelect
                getOptionLabel={(option) => option.objective_text} // Display objective_text
                onChange={handleObjectiveChange} // Handle selection changes
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.objective_text}
                    </li>
                  );
                }}
                className="autocomplete-responsive w-100"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Learning Objective"
                  />
                )}
              />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal1}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="learningoutcome">Learning Outcomes</label>
              <Autocomplete
                multiple
                id="learning-outcome-autocomplete"
                options={outcome}
                disableCloseOnSelect
                getOptionLabel={(option) => option.outcome_text}
                onChange={handleOutcomeChange}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.outcome_text}
                    </li>
                  );
                }}
                className="autocomplete-responsive w-100"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Learning Outcomes"
                  />
                )}
              />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal2}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="prerequisite">Pre - Requisite</label>
              <Autocomplete
                multiple
                id="prerequisite-autocomplete"
                options={prerequisite}
                disableCloseOnSelect
                getOptionLabel={(option) => option.prerequisite_text} // Adjust the label based on the field you want to display
                onChange={handlePrerequisiteChange}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.prerequisite_text}{" "}
                      {/* Adjust this if necessary */}
                    </li>
                  );
                }}
                className="autocomplete-responsive w-100"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Pre - Requisite" />
                )}
              />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal3}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="learnergroup">Learner Group</label>
              <Autocomplete
                multiple
                id="learnergroup-autocomplete"
                options={learnergroup}
                disableCloseOnSelect
                getOptionLabel={(option) => option.learner_group_level} // Adjust label if necessary
                onChange={handleLearnergroupChange}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.learner_group_level} {/* Adjust this if needed */}
                    </li>
                  );
                }}
                className="autocomplete-responsive w-100"
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Learner Group" />
                )}
              />
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleOpenModal4}
              >
                +
              </button>
            </div>
          </div>

          <input
            type="submit"
            className="frmbutton rounded-1 p-2"
            value="Submit"
          />
        </form>
      </div>

      {/* Modal for Adding Category (isModalOpen) */}
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
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleAddCategory}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Learning Objective (isModalOpen1) */}
      {isModalOpen1 && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Learning Objective</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter Learning Objective"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleAddCategory1}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleCloseModal1}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Learning Outcomes </h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter Learning Outcomes"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleAddCategory2}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleCloseModal2}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen3 && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Pre-Requisite</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter Pre-Requisite"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleAddCategory3}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleCloseModal3}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen4 && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Learner Group</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter Learner Group"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleAddCategory4}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="addmodalbtn p-2 rounded-2"
                  onClick={handleCloseModal4}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
