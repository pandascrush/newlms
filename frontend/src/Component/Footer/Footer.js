import React from "react";
import './Footer.css'
export function Footer(){
    const currentYear = new Date().getFullYear();
    return(
       
            <div className="container-fluid bgcolourfooter pt-1" id="footer">
                <div className="d-flex justify-content-center align-items-center">         
                <p className="text-center pt-1 mt-1">Copyright © {currentYear}  KGGL. All Right Reserved.</p>
                </div>
           </div>    
    );
}

