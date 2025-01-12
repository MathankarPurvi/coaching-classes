import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [popularClasses, setPopularClasses] = useState([]);
  const [recommendedClasses, setRecommendedClasses] = useState([]);

  useEffect(() => {
    // Mock data for popular and recommended classes
    setPopularClasses([
      { id: 1, name: "Math Mastery", category: "Academics", rating: 4.8 },
      { id: 2, name: "Fitness Pro", category: "Health & Fitness", rating: 4.5 },
      { id: 3, name: "Art Studio", category: "Arts & Crafts", rating: 4.7 },
    ]);
    setRecommendedClasses([
      { id: 1, name: "AI for Beginners", category: "Technology", rating: 4.9 },
      { id: 2, name: "Yoga Bliss", category: "Health", rating: 4.4 },
      { id: 3, name: "Piano Lessons", category: "Music", rating: 4.6 },
    ]);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLogout = () => {
    // Logout logic
    alert("Logged out successfully!");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Coaching Finder</h1>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#aboutus">About Us</a></li>
          <li><a href="#contactus">Contact Us</a></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      {/* Welcome Banner */}
      <header className="welcome-banner">
        <h2>Welcome to Coaching Finder</h2>
        <p>Discover the best classes tailored to your needs and interests!</p>
      </header>

      {/* City Search */}
      <section className="city-search">
        <h3>Find Classes in Your City</h3>
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={handleCityChange}
        />
        <p>{city ? `Showing results for "${city}"` : "Enter a city to see recommendations"}</p>
      </section>

      {/* Popular Classes */}
      <section className="popular-classes">
        <h3>Popular Classes</h3>
        <div className="classes-list">
          {popularClasses.map((cls) => (
            <div key={cls.id} className="class-card">
              <h4>{cls.name}</h4>
              <p>Category: {cls.category}</p>
              <p>Rating: ⭐{cls.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Classes */}
      <section className="recommended-classes">
        <h3>Recommended For You</h3>
        <div className="classes-list">
          {recommendedClasses.map((cls) => (
            <div key={cls.id} className="class-card">
              <h4>{cls.name}</h4>
              <p>Category: {cls.category}</p>
              <p>Rating: ⭐{cls.rating}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
