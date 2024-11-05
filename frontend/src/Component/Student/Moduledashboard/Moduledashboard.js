import React from 'react'
import Modulesidebar from '../modulesidebar/Modulesidebar'

function Moduledashboard() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-2'>
           <Modulesidebar/>
            </div>
            <div className='col-10'>
            <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Moduledashboard