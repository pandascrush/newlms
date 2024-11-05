import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./Menubar.css";

function Menubar() {
  return (
    <Navbar className="navbarbgcolour" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/activecourse" >MyCourses</Nav.Link>
       
            <Nav.Item>
            <div className='box mt-1 mx-2'>
             <input type='text' placeholder='Search...' />
           <a href='#' />
            <FontAwesomeIcon icon={faSearch} className="search-icon text-dark iconsearch" />
           </div>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;
