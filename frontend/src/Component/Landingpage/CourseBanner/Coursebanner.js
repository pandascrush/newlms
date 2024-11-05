import React, { useState } from 'react';
import './Coursebanner.css';
import a from './Course.json';
import { useNavigate } from 'react-router-dom';

const CourseBanner = () => {
  const [courses] = useState(a);
  const navigate = useNavigate();
  const changepage = () => {
    navigate("/coursedetail");
  };

  return (
    <div className='container-fluid coursebgcolour'>
      <h1 className='text-center text-light'>Our Courses</h1>
      <div className='row d-flex justify-content-evenly'>
        {courses.map(course => (
          <div className='col-4' key={course.title}>
            <div className='card rounded-3 bannercrd'>
              <img src={course.image} className='card-image-top m-2 rounded-3' alt={course.title} />
              <div className='card-body'>
                <div className="card-text">
                  <h3 className='coursetext'>Our Courses</h3>
                  <p className='coursetext'>{course.title}</p>
                </div>
                <div className="card-progress">
                  <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                </div>
                <button className='coursebutton' onClick={changepage}>Enroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBanner;
