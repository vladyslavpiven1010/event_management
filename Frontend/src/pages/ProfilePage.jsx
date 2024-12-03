import React, { useEffect, useState } from "react";
import "./../styles/Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your auth token handling
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="profile-banner"
          src="/path-to-banner-image.jpg" // Replace with your banner image
          alt="Banner"
        />
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={user.avatar || "/path-to-default-avatar.jpg"} // Replace with your avatar handling
            alt="Avatar"
          />
          <h2>{user.name || "John Doe"}</h2>
          <p>Birth date: {user.birthDate || "Not provided"}</p>
          <p>Company name: {user.companyName || "Not provided"}</p>
          <div className="social-links">
            {/* Replace with actual links */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">F</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">T</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">L</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">I</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Y</a>
          </div>
        </div>
        <div className="settings-icon">
          <a href="/settings">⚙</a>
        </div>
      </div>
      <div className="profile-navigation">
        <button className="nav-btn active">About</button>
        <button className="nav-btn">Tickets</button>
        <button className="nav-btn">My Events</button>
      </div>
      <div className="profile-details">
        <div className="detail">
          <h3>Username</h3>
          <p>{user.username || "Not provided"}</p>
        </div>
        <div className="detail">
          <h3>First Name</h3>
          <p>{user.firstName || "Not provided"}</p>
        </div>
        <div className="detail">
          <h3>Last Name</h3>
          <p>{user.lastName || "Not provided"}</p>
        </div>
        <div className="detail">
          <h3>Email</h3>
          <p>{user.email || "Not provided"}</p>
        </div>
        <div className="detail">
          <h3>Gender</h3>
          <p>{user.gender || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
