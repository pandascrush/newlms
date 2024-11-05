import React from 'react';
import './Activecourses.css';
import stud1 from "../../../Asset/graduatedgirl.png";
import stud2 from "../../../Asset/stud2.png";
import stud3 from "../../../Asset/lapcard.png";
import reviewim from "../../../Asset/review.png";
import CountUp, { useCountUp } from 'react-countup';

function ActiveCourses() {
  useCountUp({
    ref: 'counter',
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });
  return (
    <div className='container-fluid'>
      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div class="row g-0">
              <div class="col-md-4 p-2">
                <img src={stud1} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title titletext mt-2">Learn UI/UX Design Fundamentals</h5>
                  <button className='orangebtn rounded-5'>Go to Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <h4>Description:</h4>
          <p>Transform your creative vision into impactful user experiences with our comprehensive UI/UX Design Course.</p>
          <div className='d-flex'>
            <img src={reviewim} style={{ height: "50px" }} />
            <div className='mx-2'>
              <h4 className='icntxt'><CountUp start={0} end={5000} enableScrollSpy className="fontsize"></CountUp>K+ People</h4>
              <h1 className="text-primarycolor fontsize"></h1>
              <p>Get Benefits of Enrolling this Course.</p>
            </div>
          </div>
        </div>
      </div>

      {/* //secondpart */}

      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div class="row g-0">
              <div class="col-md-4 p-2">
                <img src={stud2} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title titletext mt-2">React JS</h5>
                  <button className='orangebtn rounded-5'>Go to Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <h4>Description:</h4>
          <p>Transform your creative vision into impactful user experiences with our comprehensive UI/UX Design Course.</p>
          <div className='d-flex'>
            <img src={reviewim} style={{ height: "50px" }} />
            <div className='mx-2'>
              <h4 className='icntxt'><CountUp start={0} end={2000} enableScrollSpy className="fontsize"></CountUp>K+ People</h4>
              <p>Get Benefits of Enrolling this Course.</p>
            </div>
          </div>
        </div>
      </div>

      {/* thirdpart */}
      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div class="row g-0">
              <div class="col-md-4 p-2">
                <img src={stud3} class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title titletext mt-2">Frontend
                    Development</h5>
                  <button className='orangebtn rounded-5'>Go to Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <h4>Description:</h4>
          <p>Transform your creative vision into impactful user experiences with our comprehensive UI/UX Design Course.</p>
          <div className='d-flex'>
            <img src={reviewim} style={{ height: "50px" }} />
            <div className='mx-2'>
              <h4 className='titletext'><CountUp start={0} end={1900} enableScrollSpy className="fontsize"></CountUp>K+ People</h4>
              <p>Get Benefits of Enrolling this Course.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveCourses;
