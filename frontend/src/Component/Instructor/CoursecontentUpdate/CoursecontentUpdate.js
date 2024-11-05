import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./CoursecontentUpdate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CoursecontentUpdate() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [moduleContent, setModuleContent] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [editorContentMap, setEditorContentMap] = useState({});
  const editorRefs = useRef({});

  useEffect(() => {
    // Fetch module data
    axios
      .get(`${process.env.REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModules(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    setSelectedModuleId(moduleId);

    // Fetch module content based on selected moduleId
    axios
      .get(
        `${process.env.REACT_APP_API_URL}course/getmodulepagecontent/${moduleId}`
      )
      .then((res) => {
        const contentData = res.data.result;
        setModuleContent(contentData);

        // Initialize editor content map
        const contentMap = {};
        contentData.forEach((content) => {
          contentMap[content.pageid] = content.page_content;
        });
        setEditorContentMap(contentMap);
      })
      .catch((err) => {
        console.error("Error fetching module content:", err);
      });
  };

  const handleContentChange = (newContent, contentId) => {
    setEditorContentMap((prevMap) => ({
      ...prevMap,
      [contentId]: newContent,
    }));
    setSelectedContentId(contentId);
  };

  const handleUpdateContent = () => {
    if (!selectedContentId || !editorContentMap[selectedContentId]) {
      alert("Please select a content item and enter the updated content.");
      return;
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}course/updatepagecontent`, {
        contentid: selectedContentId,
        pagecontent: editorContentMap[selectedContentId],
      })
      .then((res) => {
        if (res.data.error === "Failed to update content") {
          toast.error("Failed to update content");
        } else if (res.data.message === "Content updated successfully") {
          toast.success("Content updated successfully");
          handleModuleChange({ target: { value: selectedModuleId } });
        }
      })
      .catch((err) => {
        console.error("Error updating content:", err);
        toast.error("Failed to update content.");
      });
  };

  // Custom handler to prevent form submit/refresh
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <h2 className="text-center py-4">Update Course Content</h2>
      <div className="container coursecontentupdate p-4 rounded-3">
        <ToastContainer />
        <div>
          <label className="py-1">Select Module:</label>
          <br />
          <select value={selectedModuleId} onChange={handleModuleChange}>
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.moduleid} value={module.moduleid}>
                {module.modulename}
              </option>
            ))}
          </select>
        </div>

        <div className="py-4">
          <h3>Module Content:</h3>
          {moduleContent.length > 0 ? (
            <ul>
              {moduleContent.map((content) => (
                <li key={content.pageid}>
                  <h4>Page ID: {content.pageid}</h4>
                  <JoditEditor
                    ref={(el) => (editorRefs.current[content.pageid] = el)}
                    value={editorContentMap[content.pageid] || ""}
                    onBlur={(newContent) =>
                      handleContentChange(newContent, content.pageid)
                    } // Save only onBlur
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No content available for this module.</p>
          )}
        </div>

        <button onClick={handleUpdateContent} className="subbtn">
          Update Content
        </button>
      </div>
    </>
  );
}

export default CoursecontentUpdate;
