import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "./../styles/Profile.css";
import bannerImage from "./../assets/banner.jpg";
import profileImage from "./../assets/defaultAvatar.png";

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About"); // State for active tab

  const navigate = useNavigate();

  const handleCreateCompany = () => {
    const userToken = Cookies.get("token"); // Retrieve token from cookies
    if (userToken) {
      navigate("/create-company", { state: { token: userToken } });
    } else {
      alert("You need to be logged in to create a company!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        if (!token) throw new Error("Authentication token is missing.");

        const response = await axios.get(`http://localhost:5001/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (err) {
        console.error("Error loading user data:", err.message);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const renderTabContent = () => {
    if (activeTab === "About") {
      return (
        <div className="profile-details">
          <div className="detail">
            <h3>Username</h3>
            <p>{userData.username || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>First Name</h3>
            <p>{userData.name.split(" ").slice(0, -1).join(" ") || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Last Name</h3>
            <p>{userData.name.split(" ").slice(-1).join(" ") || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Email</h3>
            <p>{userData.email || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Gender</h3>
            <p>{userData.gender || "Not provided"}</p>
          </div>
        </div>
      );
    } else if (activeTab === "Tickets") {
      return (
        <div>
          <p>Here is a list of your tickets. (This is placeholder content)</p>
        </div>
      );
    } else if (activeTab === "My Events") {
      return (
        <div>
          <p>
            <strong>Only Company users</strong> can create their own events.
          </p>
          <p>
            Do you want to
            <strong
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={handleCreateCompany}
            >
              create
            </strong>
            a company user account?
          </p>
        </div>
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="profile-banner"
          src={bannerImage} // Replace with your banner image
          alt="Banner"
        />
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={userData.avatar || profileImage} // Replace with actual avatar logic
            alt="Avatar"
          />
          <h2>{userData.name || "John Doe"}</h2>
          <p>Birth date: {userData.birthDate || "Not provided"}</p>
          <p>Company name: {userData.companyName || "Not provided"}</p>
        </div>
        <div className="settings-icon">
          <a href="/settings">⚙</a>
        </div>
      </div>
      <div className="profile-navigation">
        <button
          className={`nav-btn ${activeTab === "About" ? "active" : ""}`}
          onClick={() => setActiveTab("About")}
        >
          About
        </button>
        <button
          className={`nav-btn ${activeTab === "Tickets" ? "active" : ""}`}
          onClick={() => setActiveTab("Tickets")}
        >
          Tickets
        </button>
        <button
          className={`nav-btn ${activeTab === "My Events" ? "active" : ""}`}
          onClick={() => setActiveTab("My Events")}
        >
          My Events
        </button>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="profile-details">{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;
