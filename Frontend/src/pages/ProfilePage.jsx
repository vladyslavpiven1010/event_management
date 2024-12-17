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
import ProfileSettingsModal from "./../components/UpdateModal";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userTickets, setUserTickets] = useState([]); // Tickets state
  const [userEvents, setUserEvents] = useState([]); // State to store user events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About");
  const [ticketLoading, setTicketLoading] = useState(false); // Ticket loading state
  const [eventsLoading, setEventsLoading] = useState(false); // Loading state for events
  const [addresses, setAddresses] = useState(""); // Address input state
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenSettings = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsModalOpen(false);
  };

  // Function to convert latitude and longitude into an address
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      if (response.data && response.data.display_name) {
        return response.data.display_name; // Full address
      } else {
        throw new Error("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error during reverse geocoding:", error.message);
      return "Unable to fetch address.";
    }
  };

  // Populate addresses when userEvents change
  useEffect(() => {
    const fetchAddresses = async () => {
      const newAddresses = {};
      for (const event of userEvents) {
        if (event.lat && event.lng) {
          newAddresses[event.id] = await reverseGeocode(event.lat, event.lng);
        } else {
          newAddresses[event.id] = "Location not provided";
        }
      }
      setAddresses(newAddresses); // Update state with fetched addresses
    };

    fetchAddresses();
  }, [userEvents]);

  const handleCreateCompany = () => {
    const userToken = Cookies.get("token");
    if (userToken) {
      navigate("/create-company", { state: { token: userToken } });
    } else {
      alert("You need to be logged in to create a company!");
    }
  };

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`http://localhost:5001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const fetchUserTickets = async () => {
    setTicketLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5001/ticket/all_own`, // Updated endpoint
        {
          headers: { Authorization: `Bearer ${token}` }, // Token for authorization
        }
      );
      setUserTickets(response.data); // Assuming this returns an array of tickets
    } catch (err) {
      console.error("Error loading tickets:", err.message);
      setError("Failed to load tickets.");
    } finally {
      setTicketLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    setEventsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`http://localhost:5001/event/all_own`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserEvents(response.data); // Set the events data to state
    } catch (err) {
      setError("Failed to load user events.");
    } finally {
      setEventsLoading(false);
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "Tickets") {
      fetchUserTickets(); // Fetch tickets when clicking "Tickets"
    }
    else if (tab === "My Events") {
      fetchUserEvents(); // Fetch tickets when clicking "Tickets"
    }
  }; 
  
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
            <p>{userData.name?.split(" ").slice(0, -1).join(" ") || "Not provided"}</p>
          </div>
          <div className="detail">
            <h3>Last Name</h3>
            <p>{userData.name?.split(" ").slice(-1).join(" ") || "Not provided"}</p>
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
      if (ticketLoading) return <p>Loading tickets...</p>;
      if (userTickets.length === 0) return <p>No tickets found.</p>;
  
      return (
        <div className="tickets-container">
          {userTickets.map((ticket, index) => (
            <div className="ticket-item" key={index}>
              <div className="ticket-column">{ticket.event_id.name || "Unnamed Event"}’ event</div>
              <div className="ticket-column">{addresses[ticket.event_id] || "Location not provided"}</div>
              <div className="ticket-column">{ticket.event_id.event_date || "No date"}</div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "My Events") {
      if (userData.role_id.id !== 2) {
        return (
          <div>
            <p>
              <strong>Only Company users</strong> can create and view their own events.
            </p>
            <p>
              Do you want to{" "}
              <strong
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleCreateCompany}
              >
                create
              </strong>{" "}
              a company user account?
            </p>
          </div>
        );
      }
  
      if (eventsLoading) return <p>Loading events...</p>;
      if (userEvents.length === 0) return <p>No events found.</p>;
  
      return (
        <div className="events-container">
          {userEvents.map((event, index) => (
            <div className="ticket-item" key={index}>
              <div className="ticket-column">‘{event.name || "Unnamed Event"}’ event</div>
              <div className="ticket-column">{addresses[event.id] || "Location not provided"}</div>
              <div className="ticket-column">{event.event_date || "No date"}</div>
            </div>
          ))}
        </div>
      );
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="profile-page">
      <div className="profile-header">
        <img className="profile-banner" src={bannerImage} alt="Banner" />
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={userData.avatar || profileImage}
            alt="Avatar"
          />
          <h2>{userData.name || "John Doe"}</h2>
        </div>
        <div className="settings-icon">
          <span style={{ cursor: "pointer" }} onClick={handleOpenSettings}>
            ⚙
          </span>
        </div>

         {/* Render Modal */}
        {isSettingsModalOpen && (
          <ProfileSettingsModal
            userId={userId}
            onClose={handleCloseSettings}
          />
        )}

        <div className="user-credentials">
          {/* <p>Birth date: {userData.birthDate || "Not provided"}</p> */}
          <p>
            Company name:{" "}
            {userData?.company_id?.name ? (
              <span
                style={{cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate(`/company/${userData.company_id.id}`)}
              >
                {userData.company_id.name}
              </span>
            ) : (
              "Not provided"
            )}
          </p>
        </div>
      </div>
      <div className="profile-navigation">
        <button
          className={`nav-btn ${activeTab === "About" ? "active" : ""}`}
          onClick={() => handleTabChange("About")}
        >
          About
        </button>
        <button
          className={`nav-btn ${activeTab === "Tickets" ? "active" : ""}`}
          onClick={() => handleTabChange("Tickets")}
        >
          Tickets
        </button>
        <button
          className={`nav-btn ${activeTab === "My Events" ? "active" : ""}`}
          onClick={() => handleTabChange("My Events")}
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
