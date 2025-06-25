import React from 'react';
import { Link } from 'react-router-dom';
import './about.css'; // Ensure correct path

function AboutUs() {
    return (
        <div className='about-container'>
            {/* Hero Section */}
            <section className='hero-about'>
                <h1 className='about-title'>Welcome to CertiFire</h1>
                <p className='about-subtitle'>Your trusted partner for authentic and verified internship certifications.</p>
            </section>
            
            {/* Mission and Why Choose Us */}
            <section className='about-section'>
                <div className='about-card'>
                    <h2>Our Mission</h2>
                    <p>At CertiFire, we aim to provide a seamless experience for verifying and managing internship certificates, ensuring authenticity and transparency for both students and institutions.</p>
                </div>

                <div className='about-card'>
                    <h2>Why Choose Us</h2>
                    <p>CertiFire is fast, reliable, and secure. We offer a streamlined process for certificate verification, making it easier for students to prove their internships and skills.</p>
                </div>

                <div className='about-card'>
                    <h2>Join Us</h2>
                    <p>Ready to start your journey with us? Let CertiFire handle your certification needs while you focus on what matters most: learning and growth.</p>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className='team-section'>
                <h2 className='section-title'>Meet Our Team</h2>
                <div className='team-carousel'>
                    <div className='team-wrapper'>
                        {/* Repeat team cards for continuous scrolling effect */}
                        <div className='team-card'>
                            <img src={require('../xyz/member1.jpg')} alt="Team Member 1" />
                            <h3>John Doe</h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member2.jpg')} alt="Team Member 2" />
                            <h3>Jane Smith</h3>
                            <p>CTO</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member3.jpg')} alt="Team Member 3" />
                            <h3>Mike Johnson</h3>
                            <p>Lead Developer</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member4.jpg')} alt="Team Member 4" />
                            <h3>Emily Davis</h3>
                            <p>UI/UX Designer</p>
                        </div>
                        {/* Duplicate team cards to enable continuous scrolling */}
                        <div className='team-card'>
                            <img src={require('../xyz/member1.jpg')} alt="Team Member 1" />
                            <h3>John Doe</h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member2.jpg')} alt="Team Member 2" />
                            <h3>Jane Smith</h3>
                            <p>CTO</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member3.jpg')} alt="Team Member 3" />
                            <h3>Mike Johnson</h3>
                            <p>Lead Developer</p>
                        </div>
                        <div className='team-card'>
                            <img src={require('../xyz/member4.jpg')} alt="Team Member 4" />
                            <h3>Emily Davis</h3>
                            <p>UI/UX Designer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className='cta-section'>
                <h2 className='cta-title'>Ready to Get Started?</h2>
                <p className='cta-text'>Join CertiFire today and experience seamless certificate management at your fingertips.</p>
                <Link to='/register' className='cta-button'>Explore More</Link>
            </section>
        </div>
    );
}

export default AboutUs;
