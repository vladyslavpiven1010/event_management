import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import "./../styles/Profile.css";
import bannerImage from './../assets/banner.jpg';
import profileImage from './../assets/defaultAvatar.png';

import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";

const CompanyProfile = () => {
  const { companyId } = useParams(); // Get the company ID from the URL
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About"); // State for active tab

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = Cookies.get("token");
        console.log(token)
        const response = await axios.get(`http://localhost:5001/company/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        setCompanyData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          await handleRefreshToken();
          fetchCompanyData(); // Retry fetching data after refreshing the token
        } else {
          console.error("Error loading company data:", err.message);
          setError("Failed to load company data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const handleRefreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.post("http://localhost:5001/auth/refresh", {
        refreshToken,
      });
      Cookies.set("token", response.data.accessToken);
    } catch (err) {
      console.error("Error refreshing token:", err.message);
      setError("Session expired. Please log in again.");
    }
  };

  const renderTabContent = () => {
    if (activeTab === "About") {
      return (
        <div className="profile-details">
          <div className="detail">
            <h3>Company Name</h3>
            <p>{companyData?.name || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Description</h3>
            <p>{companyData?.description || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Country Code</h3>
            <p>{companyData?.country_code || "Not provided"}</p>
          </div>
        </div>
      );
    } else if (activeTab === "Events") {
      return (
        <div>
          <h3>Company Events</h3>
          <p>Here is a list of company events. (This is placeholder content)</p>
        </div>
      );
    } else if (activeTab === "Members") {
      return (
        <div>
          <h3>Company Members</h3>
          <p>Here is a list of company members. (This is placeholder content)</p>
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
            src={companyData?.logo || profileImage} // Replace with actual logo logic
            alt="Company Logo"
          />
          <h2>{companyData?.name || "Company Name"}</h2>
          <p>Founded: {companyData?.foundedDate || "Not provided"}</p>
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
          className={`nav-btn ${activeTab === "Events" ? "active" : ""}`}
          onClick={() => setActiveTab("Events")}
        >
          Events
        </button>
        <button
          className={`nav-btn ${activeTab === "Members" ? "active" : ""}`}
          onClick={() => setActiveTab("Members")}
        >
          Members
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

export default CompanyProfile;
