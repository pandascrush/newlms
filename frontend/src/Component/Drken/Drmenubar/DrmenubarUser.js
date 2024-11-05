import React, { useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Drmenubar.css";
import loginimg from "../../../Asset/profile1.png";
import Mainlogo from "../../../Asset/image 39.png";
import axios from "axios";

function DrmenubarUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}auth/protected`,
          {
            withCredentials: true,
          }
        );
        console.log("Token is valid:", response.data);
      } catch (error) {
        console.error("Token verification error:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar expand="lg" className="navbarcontenttext py-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={Mainlogo} alt="Main Logo" className="ms-5 ms-lg-5" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto d-lg-none">
            <Nav.Link
              as={NavLink}
              to={`/user/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={`/allcourselist/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              My Course
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={`/grade/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Grade
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={`/badge/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Badge
            </Nav.Link>

            <div className="search-bar d-flex align-items-center px-5 mt-2 bg-light">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                className="border-0 searchinput"
              />
            </div>

            <Nav.Link
              as={NavLink}
              to={`/user/${id}/profile`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Profile
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className="navpart px-3"
              activeClassName="active-link"
            >
              Logout
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <NavLink
              to={`/user/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Home
            </NavLink>
            <NavLink
              to={`/allcourselist/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              My Course
            </NavLink>
            <NavLink
              to={`/grade/${id}`}
              className="navpart px-3"
              activeClassName="active-link"
            >
              Grade
            </NavLink>
            <NavLink
              to={`/badge/${id}`}
              className="navpart px-3 me-4"
              activeClassName="active-link"
            >
              Badge
            </NavLink>

            <div className="search-bar d-none d-lg-flex align-items-center p-2 bg-light">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                className="border-0 searchinput"
              />
            </div>
            <Dropdown className="ms-4">
              <Dropdown.Toggle
                style={{ color: "#001040" ,cursor:"pointer"}}
                as="a"
                className="d-flex align-items-center p-0"
                id="dropdown-custom-components"
              >
                <img src={loginimg} alt="Profile" className="imglogin" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end custom-dropdown-menu">
                <Dropdown.Item
                  as={NavLink}
                  to={`/user/${id}/profile`}
                  className="custom-dropdown-item"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleLogout}
                  className="custom-dropdown-item"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DrmenubarUser;
