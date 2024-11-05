import React from 'react'
import { Link } from 'react-router-dom'
import "./Coursemenubar.css";

function Coursemenubar() {
  return (
    <div className='d-flex justify-content-around py-3'>
         <Link to="/activecourse" className='text-decoration-none hvr'> Enrolled</Link>
         <Link to="/ongoing"  className='text-decoration-none hvr'>Active</Link>
        <Link to="/completed"  className='text-decoration-none hvr'>Completed</Link>
       
       
    </div>
  )
}

export default Coursemenubar