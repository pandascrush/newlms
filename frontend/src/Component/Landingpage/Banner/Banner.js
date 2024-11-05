import React from 'react'
import "./Banner.css";
import bannerim1 from "../../../Asset/Bannerimage.png";
import bannerim2 from "../../../Asset/Group 270989695.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,  faClipboardList, faLaptopCode } from '@fortawesome/free-solid-svg-icons';


function Banner() {
  return (
    <div className='container-fluid bannerpage m-0' id='sapbanner'>
    <div className='row d-flex justify-content-evenly align-items-center'>
      <div className='col-sm-12 col-md-6 mx-1'>
      <h1 className='bannerheading'>Partner for your <span style={{ color: '#841ECC', textDecoration: 'underline' }}>Future</span> of Learning</h1>
    <p>Our agency can only be as strong as our people & because of team have designed game changing products</p>
    <button className='coursebtn'>OUR COURSES</button>
      </div>
      <div className='col-sm-12 col-md-5'>
        <img src={bannerim1} alt='loading' className='banner-image imparts'/>
      </div>
    </div>
  {/* </div> */}
    {/* second row */}
    <div className='container-fluid'>
<div className='row  my-3'>
<div className='col-sm-12 col-md-6 col-lg-6 imparts'>
  <img src={bannerim2} className='subjectimg'/>
</div>
<div className='col-sm-12 col-md-6 col-lg-6 mt-5'>
    <h1 className='mt-5 mb-3'>It’s time to Build Your <span style={{color:'#841ECC'}}>Skills </span></h1>
    <div>
      <div className='my-3'>
      <h4 style={{color:'#841ECC'}}><FontAwesomeIcon icon={faBook} className='ic mx-1 pe-2'/>Learn Courses </h4>
      <p>Start learning courses and build your skills</p>
      </div>
      <div className='my-3'>
      <h4 style={{color:'#841ECC'}}><FontAwesomeIcon icon={faClipboardList} className='mx-1 pe-2 ic' />Attend Quiz</h4>
      <p>Attend quiz and test your skills</p>
      </div>
      <div className='my-3'>
      <h4 style={{color:'#841ECC'}}><FontAwesomeIcon icon={faLaptopCode} className='mx-1 pe-2 ic'/>Create Your Projects</h4>
      <p>Finally you reached it's time to build project with the skills you gained</p>
      </div>
    </div>
</div>
</div>
</div>
    </div>
  )
}

export default Banner


