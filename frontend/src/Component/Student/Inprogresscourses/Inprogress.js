import React from 'react'
import stud1 from "../../../Asset/graduatedgirl.png";
import stud2 from "../../../Asset/stud2.png";
import stud3 from "../../../Asset/lapcard.png";
import reviewim from "../../../Asset/review.png";
import "./Inprogress.css";
import { Link } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';




function Inprogress() {

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col'>
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div class="row g-0">
                            <div class="col-md-4 p-2">
                                <img src={stud1} class="img-fluid rounded-start" alt="..." />
                            </div>
                            {/* demo */}
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title titletext my-2">Learn UI/UX Design Fundamentals</h5>
                                    
                                 <Link to="/course"> <button className='orangebtn rounded-5 my-2'>Go to Course</button></Link>  
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
                        {/* <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp" sx={{ width: 50, height: 50 }} />
      <Avatar alt="Travis Howard" src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" sx={{ width: 50, height: 50 }} />
      <Avatar alt="Agnes Walker" src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp" sx={{ width: 50, height: 50 }} />
      <Avatar alt="Trevor Henderson" src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" sx={{ width: 50, height: 50 }} />
      <Avatar alt="Trevor Henderson" src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" sx={{ width: 50, height: 50 }} />
    </AvatarGroup> */}
                        <div className='mx-2'>
                            <h4 className='titletext'>5K People</h4>
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
                                     {/* Progress bar */}
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
                            <h4 className='titletext'>5K People</h4>
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
                                        
  

                                    <button className='orangebtn rounded-5 my-2'>Go to Course</button>
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
                            <h4 className='titletext'>5K People</h4>
                            <p>Get Benefits of Enrolling this Course.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inprogress