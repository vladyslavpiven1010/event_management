import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import "./../styles/Profile.css";
import bannerImage from './../assets/banner.jpg';
import profileImage from './../assets/defaultAvatar.png';

import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from './Modal'

const CompanyProfile = () => {
  const { companyId } = useParams(); // Get the company ID from the URL
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About"); // State for active tab

  const [userEvents, setUserEvents] = useState([]); // State to store user events
  const [userMemebers, setUsermembers] = useState([]); // Tickets state
  const [eventsLoading, setEventsLoading] = useState(false); // Loading state for events
  const [memberLoading, setMemberLoading] = useState(false); // Ticket loading state

  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    category_id: 0,
    ticket_count: 0,
    ticket_price: 0,
    lat: 0,
    lng: 0,
    date: ""
  })

  const navigate = useNavigate();

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
        setCompanyData(response.data);
      } catch (err) {
        console.error("Error loading company data:", err.message);
        setError("Failed to load company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);


  useEffect(() => {
    if (activeTab === "Events") {
      fetchCompanyEvents();
    }
  }, [activeTab]);

  // Fetch company-specific events
  const fetchCompanyEvents = async () => {
    setEventsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5001/company/all_own_events`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserEvents(response.data); // Set the company events data to state
    } catch (err) {
      console.error("Error fetching company events:", err);
      setError("Failed to load company events.");
    } finally {
      setEventsLoading(false);
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
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
            onClick={openModal}
          >
            +
          </button>
          
          {eventsLoading ? (
            <p>Loading events...</p>
          ) : userEvents.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="events-container">
              {userEvents.map((event, index) => (
                <div className="ticket-item" key={index}>
                  <div className="ticket-column">
                    <strong>Event ID</strong>
                  </div>
                  <div className="ticket-column">
                    {event.name || "Unnamed Event"}
                  </div>
                  <div className="ticket-column">
                    {event.location || "Location not provided"}
                  </div>
                  <div className="ticket-column">
                    {event.date || "No date"}
                  </div>
              
                  {/* Yellow Update Button */}
                  <button
                    style={{
                      backgroundColor: "#FFD700",
                      color: "black",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                    onClick={() => handleUpdateEvent(event.id)}
                  >
                    U
                  </button>
                  
                  {/* Red Delete Button */}
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (activeTab === "Members") {
      if (memberLoading) return <p>Loading tickets...</p>;
      if (userMemebers.length === 0) return <p>No members found.</p>;

      return (
        <div className="tickets-container">
          {userMemebers.map((ticket, index) => (
            <div className="ticket-item" key={index}>
              <div className="ticket-column"><strong>Event ID</strong></div>
              <div className="ticket-column">‘{ticket.event_id.id || "Unnamed Event"}’ event</div>
              <div className="ticket-column">{ticket.location || "Location not provided"}</div>
              <div className="ticket-column">{ticket.event_id.event_date || "No date"}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdateEvent = (eventId) => {
    // Example logic for navigating to an update page
    navigate(`/update-event/${eventId}`);
  };
  
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = Cookies.get("token");
        await axios.delete(`http://localhost:5001/event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Event deleted successfully!");
        fetchCompanyEvents(); // Refresh events list
      } catch (err) {
        console.error("Error deleting event:", err.message);
        alert("Failed to delete event.");
      }
    }
  };

  // Open/Close modal handlers
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Handle input changes in modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Submit new event
  const handleAddEvent = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post("http://localhost:5001/event", newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event added successfully!");
      closeModal();
      fetchCompanyEvents(); // Refresh event list
    } catch (err) {
      console.error("Error adding event:", err.message);
      alert("Failed to add event.");
    }
  };
  

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
      {/* Modal for Creating a New Event */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Create New Event</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category ID:
              <input
                type="number"
                name="category_id"
                value={newEvent.category_id}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket Count:
              <input
                type="number"
                name="ticket_count"
                value={newEvent.ticket_count}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket Price:
              <input
                type="number"
                name="ticket_price"
                value={newEvent.ticket_price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Latitude:
              <input
                type="number"
                name="lat"
                value={newEvent.lat}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Longitude:
              <input
                type="number"
                name="lng"
                value={newEvent.lng}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
              />
            </label>
            <button
              type="button"
              className="submit-button"
              onClick={handleAddEvent}
            >
              Submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};



export default CompanyProfile;
