import React, { useState }  from 'react';
import { Outlet } from 'react-router-dom';
import "./Admindashboard.css";
import Adminsidebar from '../Adminsidebar/Adminsidebar';

const Admindashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dashboard-container'>
      <Adminsidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-content ${isOpen ? 'expanded' : 'collapsed'}`}>
        <Outlet />
      </div>
    </div>
  )
};

export default Admindashboard;

