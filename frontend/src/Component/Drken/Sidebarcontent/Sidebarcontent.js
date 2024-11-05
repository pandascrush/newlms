import React from "react";
import { motion } from "framer-motion";
import "./Sidebarcontent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBars,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import sideicon1 from "../../../Asset/listicon.png";
import sideicon2 from "../../../Asset/videoicon.png";
import sideicon3 from "../../../Asset/Vector.png";

const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "50px" },
};

const linkVariants = {
  open: { opacity: 1, display: "inline-block" },
  closed: { opacity: 0, display: "none" },
};

function Sidebarcontent({ isOpen, toggleSidebar }) {
  // const [isOpen, setIsOpen] = React.useState(false);

  const { id } = useParams();
  // console.log("adminside", id);
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

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
          <Link to={`/`}>
            <FontAwesomeIcon icon={faHome} className="mx-1 text-light " />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none "
            >
              <img src={sideicon1} className="mx-1" />
              Pre-Assessment
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <FontAwesomeIcon icon={faUser} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Who am I?
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <FontAwesomeIcon icon={faFileLines} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Post Assessment
            </motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default Sidebarcontent;
