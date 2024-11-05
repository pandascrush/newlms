import React, { useEffect, useState } from "react";
import "./Grade.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Grade() {
  const navigate = useNavigate(); // Correctly use useNavigate
  const { id } = useParams();

  const [grade, setGrade] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}user/grade/${id}`)
      .then((res) => {
        console.log(res.data);
        setGrade(res.data);
      });
  }, []);

  const handleNavigate = () => {
    navigate("/"); // Replace with the actual path you want to navigate to
  };
  return (
    <div className="container-fluid">
      {/* <div className='my-4'>
          <FontAwesomeIcon icon={faArrowLeft} className='arrowsize' onClick={handleNavigate()}/>
          </div> */}
      <div className="d-flex justify-content-center align-items-center px-5">
        <table className="responsive-table">
          <thead>
            <tr className="text-center">
              <th>Lessons</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grade.map((module, index) => (
              <tr key={module.moduleid} className="texttable">
                <td className="ps-5">
                  {module.moduleid}. {module.modulename}
                </td>
                <td className="text-center">
                  {module.completion_percentage} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grade;
