import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../xyz/logo.jpg'; // Import logo image
import './header1.css';

function Header1() {
  return (
    <div className='header'>
      <div className='sub-container'>
        {/* Logo with Text */}
        <Link to="/" className='logo-container'>
          <img src={logo} alt="CertiFire Logo" className='logo-img' />
           {/* <span className='logo-text'>CERTIFIRE</span>  */}
        </Link>
        <div className='nav-links'>
          <Link to="/about" className='nav-button'>About Us</Link>
          <Link to="/student" className='nav-button'>Student</Link>
          <Link to="/admin" className='nav-button'>Admin</Link>
          <Link to="/homepage" className='nav-button'>Log Out</Link>
        </div>
      </div>
    </div>
  );
}

export default Header1;