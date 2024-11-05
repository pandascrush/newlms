
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import "./Coursecompleted.css";
import stud1 from "../../../Asset/graduatedgirl.png";
import stud2 from "../../../Asset/stud2.png";
import stud3 from "../../../Asset/lapcard.png";
import certificate from "../../../Asset/certificate.png";
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

function Coursecompleted() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDownloadClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000); // Confetti duration
    // Add your download logic here
  };

  return (
    <div className='container-fluid'>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4 p-2">
                <img src={stud1} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title titletext my-2">Learn UI/UX Design Fundamentals</h5>
                  <div className='d-flex justify-content-center'>
                    <StarRating rating={4.5} />
                  </div>
                  <p>Overall Progress</p>
                  <button className='rounded-2 my-2' onClick={handleDownloadClick}>Click to Download the Certificate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <img src={certificate} alt='certificate' className='cert' />
        </div>
      </div>

      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4 p-2">
                <img src={stud2} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title titletext mt-2">React JS</h5>
                  <div className='d-flex justify-content-center'>
                    <StarRating rating={4} />
                  </div>
                  <p>Overall Progress</p>
                  <button className='rounded-2 my-2' onClick={handleDownloadClick}>Click to Download the Certificate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <img src={certificate} alt='certificate' className='cert' />
        </div>
      </div>

      <div className='row my-3'>
        <div className='col'>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
              <div className="col-md-4 p-2">
                <img src={stud3} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title titletext mt-2">Frontend Development</h5>
                  <div className='d-flex justify-content-center'>
                    <StarRating rating={4} />
                  </div>
                  <p>Overall Progress</p>
                  <Link onClick={handleDownloadClick}>Click to Download the Certificate</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <img src={certificate} alt='certificate' className='cert' />
        </div>
      </div>
    </div>
  );
}

export default Coursecompleted;
