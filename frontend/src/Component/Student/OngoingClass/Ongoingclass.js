// import React from 'react'
// import imgSrc from "../../../Asset/stud2.png";
// function Ongoingclass() {
//   return (
//     <div className='container'>
//       <div className='row mt-5'>
//         <div className='col-sm-12 col-md-6 col-lg-4'>
//           <div className="card m-3">
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">
//                   {54}%
//                 </div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='col-sm-12 col-md-6 col-lg-4'>
//         <div className="card m-3">
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">
//                   {54}%
//                 </div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>
      

//         <div className='col-sm-12 col-md-6 col-lg-4'>
//         <div className="card m-3">
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">
//                   {54}%
//                 </div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>


//         <div className='col-sm-12 col-md-6 col-lg-4'>
//         <div className="card m-3">
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">{54}%</div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>




//         <div className='col-sm-12 col-md-6 col-lg-4'>
//         <div className="card m-3" >
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">{54}%</div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className='col-sm-12 col-md-6 col-lg-4'>
//         <div className="card m-3">
//             <img src={imgSrc} className="card-img-top" alt="Card image"/>
//             <div className="card-body">
//               <h5 className="card-title">React JS</h5>
//               <p className="card-text">Brief Description of the Course</p>
//               <div className="progress">
//                 <div className="progress-bar" role="progressbar" style={{ width: `${100}%` }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">
//                   {54}%
//                 </div>
//               </div>
//               <div className='d-flex justify-content-between'>
//               <p>Overall Progress</p>
//               <p> {54}%</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Ongoingclass



import React from 'react';
import imgSrc from "../../../Asset/stud2.png";
import "./Ongoingclass.css";

function Ongoingclass() {
  return (
    <div className='container'>
      <div className='row mt-2'>
        {[...Array(6)].map((_, index) => (
          <div className='col-sm-12 col-md-6 col-lg-4' key={index}>
            <div className="card m-3 shwd" style={{ maxWidth: '20rem' }}>
              <img src={imgSrc} className="card-img-top" alt="Card image"/>
              <div className="card-body">
                <h5 className="card-title">React JS</h5>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: '54%' }} aria-valuenow={54} aria-valuemin="0" aria-valuemax="100">
                    54%
                  </div>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                  <p className='mb-0 txtprogress'>Overall Progress</p>
                  <p className='mb-0'>54%</p>
                </div>
              
                <button className='orangebtn rounded-5'>Go to Course</button>
         
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ongoingclass;
