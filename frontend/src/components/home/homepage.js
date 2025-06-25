import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">CertiFire</h1>
          <p className="hero-subtitle">Your gateway to authentic internship certifications</p>
          <Link to="/student" className="btn primary-btn">Get Certificate</Link>
        </div>
        <div className="hero-image">
        <img src={require('../xyz/logo.jpg')} alt="CertiFire Certificates" />
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">How CertiFire Works</h2>
        <div className="featured-content">
          <div className="feature-card">
            <i className="bx bx-upload feature-icon"></i>
            <h3>Admin Upload</h3>
            <p>Admins can upload student data and generate certificates effortlessly.</p>
          </div>
          <div className="feature-card">
            <i className="bx bx-search-alt feature-icon"></i>
            <h3>Quick Verification</h3>
            <p>Students can easily verify their certificates using a unique certificate ID.</p>
          </div>
          <div className="feature-card">
            <i className="bx bx-download feature-icon"></i>
            <h3>Easy Download</h3>
            <p>Certificates are ready for download with all details prefilled.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join CertiFire Today!</h2>
        <p>Start verifying and managing your certificates with ease.</p>
        <Link to="/register" className="btn secondary-btn">Get Started</Link>
      </section>
    </div>
  );
}

export default HomePage;