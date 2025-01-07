import React from 'react';
import { Navbar, Nav, NavbarBrand, NavbarToggle, NavbarCollapse } from "react-bootstrap";
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../components/Login/loginSlice';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem('accessJWT')
    localStorage.removeItem('crmSite')
    dispatch(logoutSuccess());
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect bg='dark' variant='dark' expand='md' className="custom-navbar">
      <NavbarBrand className="custom-navbar-brand">CRM</NavbarBrand>
      <NavbarToggle aria-controls='basic-navbar-nav' />
      <NavbarCollapse id='basic-navbar-nav'>
        <Nav className="ml-auto custom-nav">
          <Nav.Link href='/dashboard' className="custom-nav-link">Dashboard</Nav.Link>
          <Nav.Link href='/tickets' className="custom-nav-link">Tickets</Nav.Link>
          <Nav.Link href='/tickets' className="custom-nav-link">Complaint</Nav.Link>
          <Nav.Link onClick={handleLogout} className="custom-nav-link">Logout</Nav.Link>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;