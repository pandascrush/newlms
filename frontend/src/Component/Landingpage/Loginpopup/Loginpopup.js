import React from 'react'
import "./Loginpopup.css";
function Loginpopup() {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      <div className='card p-4'>
        <h4>Punch Your Presence</h4> 
        <img src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp" />
        <p>Verifying your face</p>
        <div className='btn btn-small btn-success m-5'>PUNCH IN</div>
        </div>  
    </div>
  )
}

export default Loginpopup