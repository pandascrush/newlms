import React from 'react';
import { motion } from 'framer-motion';
import './sidebarcomp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const sidebarVariants = {
  open: { width: '200px' },
  closed: { width: '50px' },
};

const linkVariants = {
  open: { opacity: 1, display: 'block' },
  closed: { opacity: 0, display: 'none' },
};

function Sidebarcomp() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
            <Link to={"/"}><FontAwesomeIcon icon={faHome} className='mx-1 text-light'/></Link>
          <motion.span variants={linkVariants} to={"/"}>Home</motion.span>
        </li>
        <li>
         <Link to={"/dashboard/studattendance"}> <FontAwesomeIcon icon={faUser} className='mx-1 text-light' /></Link>
        <motion.span variants={linkVariants} to={"/dashboard/unapproved"}>Profile</motion.span>
        </li>
        <li>
       <Link to={"/dashboard/unapproved"}><FontAwesomeIcon icon={faCog} className='mx-1 text-light'/></Link>
       <motion.span variants={linkVariants} to={"/dashboard/unapproved"}>Settings</motion.span>
        </li>
        <li>
            <Link to="/dashboard/approved"> <FontAwesomeIcon icon={faCog} className='mx-1 text-light'/></Link>
            <motion.span variants={linkVariants} to={"/dashboard/unapproved"}>1</motion.span>
        </li>
      </ul>
    </motion.div>
  );
}

export default Sidebarcomp;
