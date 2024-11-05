import React from "react";
import { Outlet } from "react-router-dom";
import "./Drkendashboard.css";
import Sidebarcontent from "../Sidebarcontent/Sidebarcontent";

const Drkendashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 col-md-1">
          <Sidebarcontent />
        </div>
        <div className="col-sm-10 col-md-11">
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drkendashboard;
