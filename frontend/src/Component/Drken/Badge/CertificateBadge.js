import React from "react";
import "./Badge.css";
import completioncertificate from "../../../Asset/certificate.png";
import { Link } from "react-router-dom";

function CertificateBadge() {
  return (
    <div className="container">
      <div className="certificatebg rounded-4 text-center mt-4">
        <h5 className="pt-5 pb-2 certificatepara ">Get Your Certificate</h5>
        <img src={completioncertificate} alt="certificate" className="cert" />
        <div className="text-center">
          <div className="py-3">
            <Link className="downloadtext">Download</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateBadge;
