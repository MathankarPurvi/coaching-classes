import React from 'react';
import './LandingPage.css'; // Include a separate CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <nav>
          <div className="logo">CoachingFinder</div>
          <ul className="nav-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Find the Best Coaching Classes in Your City</h1>
          <p>Discover the top-rated coaching classes for your learning needs, all in one place.</p>
          <a href="#search" className="cta-button">Start Your Search</a>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>We help students find the best coaching classes in any city, offering a comprehensive list of subjects and courses available.</p>
      </section>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Wide Range of Subjects</h3>
            <p>Find coaching for a variety of subjects including math, science, and competitive exams.</p>
          </div>
          <div className="feature-item">
            <h3>User Ratings</h3>
            <p>See ratings from other students to help choose the best classes for you.</p>
          </div>
          <div className="feature-item">
            <h3>City-wise Availability</h3>
            <p>Explore coaching options in the city of your choice.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 CoachingFinder. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
