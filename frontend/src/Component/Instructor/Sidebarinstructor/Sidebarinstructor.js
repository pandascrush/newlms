import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Sidebarinstructor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faBook,
  faFile,
  faFileUpload,
  faLightbulb,
  faPowerOff,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "50px" },
};

const linkVariants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "none" },
};

function Sidebarinstructor({ isOpen, toggleSidebar }) {
  const { id } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}auth/protected`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log("Token is valid:", response.data);
  //     } catch (error) {
  //       console.error("Token verification error:", error);
  //       navigate("/login");
  //     }
  //   };

  //   verifyToken();
  // }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/courselist`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faHome} className="mx-1 text-light mt-1" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Home
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/category`}
            className="d-flex"
          >
            <FontAwesomeIcon
              icon={faLayerGroup}
              className="mx-1 text-light mt-1"
            />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Add Category
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/coursecreation`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faFile} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Add Courses
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/coursemodule`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faFile} className="mx-1 text-light mt-1" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Module
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/coursecontent`}
            className="d-flex"
          >
            <FontAwesomeIcon
              icon={faFileUpload}
              className="mx-1 text-light mt-1"
            />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Course Content
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/quilltxt`}
            className="d-flex"
          >
            <FontAwesomeIcon
              icon={faLightbulb}
              className="mx-1 text-light mt-1"
            />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Quiz
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            to={`/instructordashboard/${id}/questionbank`}
            className="d-flex"
          >
            <FontAwesomeIcon icon={faBook} className="mx-1 text-light mt-1" />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Question Bank
            </motion.span>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
            className="d-flex"
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className="mx-1 text-light mt-1"
            />
            <motion.span
              variants={linkVariants}
              className="text ms-1 text-light"
            >
              Logout
            </motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default Sidebarinstructor;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import "./Sidebarinstructor.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faBars,
//   faBook,
//   faFile,
//   faFileUpload,
//   faLightbulb,
//   faPowerOff,
//   faLayerGroup,
//   faChevronDown,
//   faChevronUp,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const sidebarVariants = {
//   open: { width: "200px" },
//   closed: { width: "50px" },
// };

// const linkVariants = {
//   open: { opacity: 1, display: "block" },
//   closed: { opacity: 0, display: "none" },
// };

// function Sidebarinstructor({ isOpen, toggleSidebar }) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [moduleOpen, setModuleOpen] = useState(false);
//   const [courseContentOpen, setCourseContentOpen] = useState(false);
//   const [quizOpen, setQuizOpen] = useState(false);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}auth/protected`,
//           { withCredentials: true }
//         );
//         console.log("Token is valid:", response.data);
//       } catch (error) {
//         console.error("Token verification error:", error);
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}auth/logout`,
//         {},
//         { withCredentials: true }
//       );
//       document.cookie =
//         "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <motion.div
//       className="sidebar"
//       initial={false}
//       animate={isOpen ? "open" : "closed"}
//       variants={sidebarVariants}
//     >
//       <div className="toggle-btn" onClick={toggleSidebar}>
//         <FontAwesomeIcon icon={faBars} />
//       </div>
//       <ul>
//         <li>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={`/instructordashboard/${id}/courselist`}
//             className="d-flex"
//           >
//             <FontAwesomeIcon icon={faHome} className="mx-1 text-light mt-1" />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Home
//             </motion.span>
//           </Link>
//         </li>
//         <li>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={`/instructordashboard/${id}/category`}
//             className="d-flex"
//           >
//             <FontAwesomeIcon
//               icon={faLayerGroup}
//               className="mx-1 text-light mt-1"
//             />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Add Category
//             </motion.span>
//           </Link>
//         </li>
//         <li>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={`/instructordashboard/${id}/coursecreation`}
//             className="d-flex"
//           >
//             <FontAwesomeIcon icon={faFile} className="mx-1 text-light" />
//             <motion.span
//               variants={linkVariants}
//               className="text-white text-decoration-none ms-1"
//             >
//               Add Courses
//             </motion.span>
//           </Link>
//         </li>

//         {/* Module Dropdown */}
//         <li className="toggle-link" onClick={() => setModuleOpen(!moduleOpen)}>
//           <div className="d-flex align-items-center">
//             <FontAwesomeIcon icon={faFile} className="mx-1 text-light mt-1" />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Module
//             </motion.span>
//             {isOpen && ( // Conditionally render chevron icons only when sidebar is open
//               <FontAwesomeIcon
//                 icon={moduleOpen ? faChevronUp : faChevronDown}
//                 className="ms-2 chevron-icon" // Add this class
//               />
//             )}
//           </div>
//         </li>
//         {moduleOpen && (
//           <ul>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/addmodule`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Course Modules
//                 </motion.span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/updatemodule`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Update Modules
//                 </motion.span>
//               </Link>
//             </li>
//           </ul>
//         )}

//         {/* Course Content Dropdown */}
//         <li
//           className="toggle-link"
//           onClick={() => setCourseContentOpen(!courseContentOpen)}
//         >
//           <div className="d-flex align-items-center">
//             <FontAwesomeIcon
//               icon={faFileUpload}
//               className="mx-1 text-light mt-1"
//             />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Course Content
//             </motion.span>
//             {isOpen && ( // Conditionally render chevron icons only when sidebar is open
//               <FontAwesomeIcon
//                 icon={courseContentOpen ? faChevronUp : faChevronDown}
//                 className="ms-2 chevron-icon" // Add this class
//               />
//             )}
//           </div>
//         </li>
//         {courseContentOpen && (
//           <ul>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/addpagecontent`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Add Content
//                 </motion.span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/updatepagecontent`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Update Content
//                 </motion.span>
//               </Link>
//             </li>
//           </ul>
//         )}

//         {/* Quiz Dropdown */}
//         <li className="toggle-link" onClick={() => setQuizOpen(!quizOpen)}>
//           <div className="d-flex align-items-center">
//             <FontAwesomeIcon
//               icon={faLightbulb}
//               className="mx-1 text-light mt-1"
//             />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Quiz
//             </motion.span>
//             {isOpen && ( // Conditionally render chevron icons only when sidebar is open
//               <FontAwesomeIcon
//                 icon={quizOpen ? faChevronUp : faChevronDown}
//                 className="ms-2 chevron-icon" // Add this class
//               />
//             )}
//           </div>
//         </li>
//         {quizOpen && (
//           <ul>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/addquestion`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Add Question
//                 </motion.span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/instructordashboard/${id}/updatequestion`}
//                 className="d-flex"
//               >
//                 <motion.span
//                   variants={linkVariants}
//                   className="text ms-1 text-light"
//                 >
//                   Update Question
//                 </motion.span>
//               </Link>
//             </li>
//           </ul>
//         )}

//         <li>
//           <Link
//             style={{ textDecoration: "none" }}
//             to={`/instructordashboard/${id}/questionbank`}
//             className="d-flex"
//           >
//             <FontAwesomeIcon icon={faBook} className="mx-1 text-light mt-1" />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Question Bank
//             </motion.span>
//           </Link>
//         </li>
//         <li>
//           <Link
//             style={{ textDecoration: "none" }}
//             onClick={handleLogout}
//             className="d-flex"
//           >
//             <FontAwesomeIcon
//               icon={faPowerOff}
//               className="mx-1 text-light mt-1"
//             />
//             <motion.span
//               variants={linkVariants}
//               className="text ms-1 text-light"
//             >
//               Logout
//             </motion.span>
//           </Link>
//         </li>
//       </ul>
//     </motion.div>
//   );
// }

// export default Sidebarinstructor;
