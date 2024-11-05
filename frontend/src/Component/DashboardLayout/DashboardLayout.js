// import React from 'react';

// import { Outlet } from 'react-router-dom';
// import './DashboardLayout.css'; // Assuming you have some styles for layout
// import Sidebarcomp from '../sidebarcomp/sidebarcomp';

// const DashboardLayout = () => {
//   return (
   
//     <div className="dashboard-layout">
//       <Sidebarcomp/>
//       <div className="dashboard-content">
//         <Outlet />
//       </div>
//     </div>
    
//   );
// };

// export default DashboardLayout;


import React from 'react';

import { Outlet } from 'react-router-dom';
import './DashboardLayout.css'; 
import Sidebarcomp from '../sidebarcomp/sidebarcomp';

const DashboardLayout = () => {
  return (
   <div className='container-fluid'>
    <div className='row'>
      <div className='col-sm-2 col-md-1'>
      <Sidebarcomp/>
      </div>
      <div className='col-sm-10 col-md-11'>
      <div className="dashboard-content">
        <Outlet />
      </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
