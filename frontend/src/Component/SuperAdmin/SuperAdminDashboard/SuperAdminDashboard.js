import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./SuperAdminDashboard.css";
import SuperAdminSidebar from "../SuperAdminSidebar/SuperAdminSidebar";

const SuperAdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <SuperAdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-content ${isOpen ? "expanded" : "collapsed"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
