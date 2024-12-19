import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import "./../styles/Profile.css";
import bannerImage from './../assets/banner.jpg';
import profileImage from './../assets/defaultAvatar.png';

import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";
import Modal from './Modal'
import ProfileSettingsModal from "./../components/UpdateModal";

const CompanyProfile = () => {
  // Function to get the current date and time in YYYY-MM-DDTHH:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Set the minimum datetime when the component mounts
  useEffect(() => {
    setMinDateTime(getCurrentDateTime());
  }, []);

  const { companyId } = useParams(); // Get the company ID from the URL
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About"); // State for active tab

  const [userEvents, setUserEvents] = useState([]); // State to store user events
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [eventsLoading, setEventsLoading] = useState(false); // Loading state for events
  const [memberLoading, setMemberLoading] = useState(false); // Ticket loading state
  const [memberCount, setMemberCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [searchUninvited, setSearchUninvited] = useState(""); // Search for uninvited users
  const [searchInvited, setSearchInvited] = useState("");

  const [members, setMembers] = useState([]); // State for current members
  const [nonMembers, setNonMembers] = useState([]); // State for users not in the company
  const [isInviteModalOpen, setInviteModalOpen] = useState(false); // State to open invite modal

  const [categories, setCategories] = useState([]); // State to hold event categories
  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    category_id: 1,
    ticket_count: 0,
    ticket_price: 0,
    lat: null,
    lng: null,
    event_date: getCurrentDateTime(),
  })
  const [address, setAddress] = useState(""); // Address input state
  const [minDateTime, setMinDateTime] = useState("");
  const [addresses, setAddresses] = useState(""); // Address input state
  const [editingEvent, setEditingEvent] = useState(null); // Store the event being edited
  
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isCompanyUpdate, setIsCompanyUpdate] = useState(false);


  const handleOpenSettings = () => {
    setIsCompanyUpdate(true)
    setSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsModalOpen(false);
  };

  // Handle address input change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Fetch latitude and longitude from the address
  const handleGeocode = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: address, format: "json", limit: 1 },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setNewEvent({ ...newEvent, lat: parseFloat(lat), lng: parseFloat(lon) });
        alert(`Coordinates found: Latitude ${lat}, Longitude ${lon}`);
      } else {
        alert("Address not found. Please try again.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to fetch coordinates. Check the address and try again.");
    }
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
        console.log("Lat:", event.lat)
        console.log("Lng:", event.lng)
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

    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.sub;

        const response = await axios.get(`http://localhost:5001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserId(response.data.id); // Assuming 'me' endpoint returns the user's data
      } catch (error) {
        console.error("Error fetching current user:", error.message);
      }
    };
    fetchCurrentUser();

    fetchCompanyData();

    const fetchCategories = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:5001/category", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data); // Store categories in state
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        alert("Failed to load categories.");
      }
    };
    if (isModalOpen) fetchCategories(); // Only fetch categories when modal is open

    if (activeTab === "Events") {
      fetchCompanyEvents();
    }

    if (activeTab === "Members") {
      fetchCompanyMembers();
    }
  }, [companyId, isModalOpen, activeTab]);


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
          {/* Delete Company Button */}
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              marginTop: "20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={handleDeleteCompany}
          >
            Delete Company
          </button>
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
                    {event.name || "Unnamed Event"}
                  </div>
                  <div className="ticket-column">
                    {addresses[event.id] || "Location not provided"}
                  </div>
                  <div className="ticket-column">
                    {event.event_date || "No date"}
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
                    onClick={() => openEditModal(event)}
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
      return (
        <div>
          <input
            type="text"
            placeholder="Search members..."
            value={searchInvited}
            onChange={(e) => setSearchInvited(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => {
              fetchNonMembers();
              setInviteModalOpen(true);
            }}
          >
            Add New Member
          </button>
    
          {memberLoading ? (
            <p>Loading members...</p>
          ) : filteredMembers.length === 0 ? (
            <p>No members found.</p>
          ) : (
            <div>
              {filteredMembers.map((member) => (
                <div key={member.id} className="member-item" style={{ display: "flex", alignItems: "center" }}>
                  <span>{member.name || "Unnamed Member"}</span>
                  {memberCount > 1 && (
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        marginLeft: "10px",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleKickOut(member.id)}
                    >
                      Kick Out
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
    
    {isInviteModalOpen && (
        <Modal onClose={() => setInviteModalOpen(false)}>
          <h2>Invite New Member</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchUninvited}
            onChange={(e) => setSearchUninvited(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {filteredNonMembers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul>
              {filteredNonMembers.map((user) => (
                <li key={user.id} style={{ marginBottom: "10px" }}>
                  <span>{user.name || "Unnamed User"}</span>
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      marginLeft: "10px",
                      padding: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleInviteUser(user.id)}
                  >
                    Invite
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
        </div>
      );
    }
  };

  const fetchCompanyMembers = async () => {
    setMemberLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get('http://localhost:5001/company/members', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setMembers(response.data); // Update members state
      setMemberCount(response.data.length);
    } catch (error) {
      console.error("Error fetching members:", error.message);
    } finally {
      setMemberLoading(false);
    }
  };

  const fetchNonMembers = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get('http://localhost:5001/user/free', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNonMembers(response.data); // Update state with all users
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleKickOut = async (userId) => {
    if (window.confirm("Are you sure you want to kick out this user?")) {
      try {
        const token = Cookies.get("token");
        await axios.post(`http://localhost:5001/company/kick_out/${userId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User kicked out successfully!");
  
        // Check if the kicked user is the current logged-in user
        if (userId === currentUserId) {
          alert("You have been removed from the company. Redirecting to your profile...");
          navigate("/profile"); // Redirect to the profile page
        } else {
          fetchCompanyMembers(); // Refresh members list
        }
      } catch (error) {
        console.error("Error kicking out user:", error.message);
        alert("Failed to kick out user.");
      }
    }
  };

  const handleInviteUser = async (userId) => {
    try {
      const token = Cookies.get("token");
      await axios.post(`http://localhost:5001/company/invite/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User invited successfully!");
      fetchCompanyMembers(); // Refresh the members list
      setInviteModalOpen(false);
    } catch (error) {
      console.error("Error inviting user:", error.message);
      alert("Failed to invite user.");
    }
  };

  const handleDeleteCompany = async () => {
    if (window.confirm("Are you sure you want to delete this company? This action is irreversible.")) {
      try {
        const token = Cookies.get("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.sub;

        const response = await axios.delete(`http://localhost:5001/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response)
  
        alert("Company deleted successfully!");
        Cookies.set("token", response.data.accessToken);
  
        navigate(`/profile/${userId}`);
      } catch (error) {
        console.error("Error deleting company:", error.message);
        alert("Failed to delete company. Please try again.");
      }
    }
  };

  const filteredNonMembers = nonMembers.filter((user) =>
    user.name.toLowerCase().includes(searchUninvited.toLowerCase())
  );

  const filteredMembers = members.filter((user) =>
    user.name.toLowerCase().includes(searchInvited.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (isEditing) {
      setEditingEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
      console.log(editingEvent)
    } else {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
      console.log(newEvent)
    }
    
    // If handling event_date specifically, ensure it's formatted correctly
    if (name === "event_date" && value) {
      const formattedDate = new Date(value).toISOString();
      if (isEditing) {
        setEditingEvent((prevEvent) => ({
          ...prevEvent,
          event_date: formattedDate,
        }));
      } else {
        setNewEvent((prevEvent) => ({
          ...prevEvent,
          event_date: formattedDate,
        }));
      }
    }
  };

  // Submit handler
  const handleAddEvent = async () => {
    if (!newEvent.event_date || !newEvent.name) {
      alert("Please fill in all required fields!");
      return;
    }
  
    try {
      const token = Cookies.get("token");
      await axios.post("http://localhost:5001/event", newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Event added successfully!");
      closeModal();
      fetchCompanyEvents();
    } catch (err) {
      console.error("Error adding event:", err.message);
      alert("Failed to add event.");
    }
  };

  // Open modal for editing an event
  const openEditModal = (event) => {
    setEditingEvent(event); // Set the selected event for editing
    setIsEditing(true); // Switch to editing mode
    setModalOpen(true); // Open the modal
  };
  
  // Handle updating an event
  const handleUpdateEvent = async () => {
    if (!editingEvent.event_date || !editingEvent.name) {
      alert("Please fill in all required fields!");
      return;
    }
    
    console.log(editingEvent)

    try {
      const token = Cookies.get("token");
      await axios.patch(`http://localhost:5001/event/${editingEvent.id}`, editingEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Event updated successfully!");
      closeModal();
      fetchCompanyEvents();
    } catch (err) {
      console.error("Error updating event:", err.message);
      alert("Failed to update event.");
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
      
      <div className="settings-icon">
        <span style={{ cursor: "pointer" }} onClick={handleOpenSettings}>
          ⚙
        </span>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
          onClick={() => navigate(`/`)}
        >
          Back to Home
        </button>
      </div>

      {/* Render Modal */}
      {isSettingsModalOpen && (
        <ProfileSettingsModal
          companyId={companyData.id}
          isCompany={isCompanyUpdate}
          onClose={handleCloseSettings}
        />
      )}

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
          <h2>{isEditing ? "Edit Event" : "Create New Event"}</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={isEditing ? editingEvent?.name : newEvent.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={isEditing ? editingEvent?.description : newEvent.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Category:
              <select
                name="category_id"
                value={isEditing ? editingEvent?.category_id : newEvent.category_id}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ticket Count:
              <input
                type="number"
                name="ticket_count"
                value={isEditing ? editingEvent?.ticket_count : newEvent.ticket_count}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket Price:
              <input
                type="number"
                name="ticket_price"
                value={isEditing ? editingEvent?.ticket_price : newEvent.ticket_price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter event address"
              />
              <button type="button" onClick={handleGeocode}>
                Find Coordinates
              </button>
            </label>
            {(isEditing ? editingEvent.lat : newEvent.lat) && (
              <p>
                Latitude: {isEditing ? editingEvent.lat : newEvent.lat}, Longitude: {isEditing ? editingEvent.lng : newEvent.lng}
              </p>
            )}
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="datetime-local"
                value={isEditing ? editingEvent?.event_date : newEvent.event_date}
                onChange={handleInputChange}
                min={minDateTime} // Restrict past dates and times
                required
              />
            </div>
            <button
              type="button"
              className="submit-button"
              onClick={isEditing ? handleUpdateEvent : handleAddEvent}
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
