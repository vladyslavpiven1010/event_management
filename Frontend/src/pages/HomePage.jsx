import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Filters from "../components/Filters";
import EventCard from "../components/EventCard";
import "./../styles/Home.css";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Modal from './Modal'
import NotificationCard from "../components/NotificationCard";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState(""); // Address input state

  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("events")

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
      for (const event of events) {
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
  }, [events]);

  // Function to fetch events with filters
  const fetchEvents = async (filters = {}) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      // Build query string using URLSearchParams
      const queryParams = new URLSearchParams();
  
      // Append filters to the query string
      if (filters.sortOption) queryParams.append("sortBy", filters.sortOption);
      if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);
      if (filters.categories?.length > 0) {
        queryParams.append("filterByCategory", filters.categories.join(","));
      }
      if (filters.ticketPriceRange?.length === 2) {
        queryParams.append("filterByTicketPrice", filters.ticketPriceRange.join(","));
      }
      if (filters.isFreePlaces) queryParams.append("isFreePlaces", "true");
  
      // Construct the URL
      const url = `http://localhost:5001/event?${queryParams.toString().replace("%2C", ",")}`;
  
      // Debug the final URL
      console.log("Fetching events from URL:", url);
  
      // Make the GET request
      const response = await axios.get(url, { headers });
      setEvents(response.data);
    } catch (err) {
      console.error("Error loading events:", err.message);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data and events on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.log("No token found - guest session");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.sub;

        const response = await axios.get(`http://localhost:5001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
    fetchEvents();
  }, []);

  const handleLogout = () => {
    // Clear token from Cookies
    Cookies.remove("token");

    // Reset state
    setUser(null);
    setIsLoggedIn(false);

    // Optionally reload the page or redirect
    window.location.href = "/";
  };

  // Handle applying filters from the Filters component
  const handleApplyFilters = (filters) => {
    fetchEvents(filters); // Fetch events with the selected filters
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event); // Set the selected event
    setIsModalOpen(true);    // Open the modal
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };
  
  const handleBuyTicket = async (eventId) => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        "http://localhost:5001/ticket",
        { event_id: eventId }, // Pass event ID in the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ticket purchased successfully!");
      handleCloseModal(); // Close the modal after buying
    } catch (error) {
      console.error("Error buying ticket:", error.message);
      alert(error.response?.data?.message || "Failed to buy ticket");
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:5001/notification/all_own", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err.message);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "notifications") {
      fetchNotifications();
    } else {
      fetchEvents();
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const token = Cookies.get("token");
      await fetch(`http://localhost:5001/notification/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      alert("Failed to delete notification");
      console.error(error);
    }
  };
  

  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="home-page">
      {isLoggedIn ? (
        <Sidebar user={user} onLogout={handleLogout} onTabChange={handleTabChange}/>
      ) : (
        <div className="sidebar">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <div className="settings">
            <a href="/settings">Settings</a>
            <a href="/help">Help</a>
            <a href="/faq">F.A.Q</a>
          </div>
        </div>
      )}
      <div className="content">
        {activeTab === "events" ? (
        <>
          <h1>Events</h1>
          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  name={event.name}
                  tickets={event.ticket_count}
                  date={event.event_date}
                  desc={event.description}
                  category={event.category_id?.name || "Uncategorized"}
                  onViewDetails={() => handleViewDetails(event)} // Pass the event data
                />
              ))}
              {isModalOpen && selectedEvent && (
              <Modal onClose={handleCloseModal}>
                <h2>{selectedEvent.description}</h2>
                <p><strong>Category:</strong> {selectedEvent.category_id?.name || "Uncategorized"}</p>
                <p><strong>Tickets Available:</strong> {selectedEvent.ticket_count}</p>
                <p><strong>Ticket Price:</strong> ${selectedEvent.ticket_price}</p>
                <p><strong>Date:</strong> {new Date(selectedEvent.event_date).toLocaleDateString()}</p>
                <p><strong>Location:</strong>{addresses[selectedEvent.id] || "Location not provided"}</p>
                <button
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                  onClick={() => handleBuyTicket(selectedEvent.id)}
                >
                  Buy Ticket
                </button>
              </Modal>
            )}
            </div>
          )}
        </>  
        ) : (
          <>
            <h1>Notifivations</h1>
            {loading ? (
              <p>Loading notifications...</p>
            ) : error ? (
              <p>{error}</p>
            ) : ( 
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    date={notification.title}
                    message={notification.content}
                    onClose={() => handleDeleteMessage(notification.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Filters onApplyFilters={handleApplyFilters} /> {/* Pass the handler as a prop */}
    </div>
  );
};

export default HomePage;
