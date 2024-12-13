import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Filters from "../components/Filters";
import EventCard from "../components/EventCard";
import "./../styles/Home.css";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div className="home-page">
      {isLoggedIn ? (
        <Sidebar user={user} onLogout={handleLogout}/>
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
                name={event.description}
                tickets={event.ticket_count}
                address={`Lat: ${event.lat}, Lng: ${event.lng}`}
                date={event.event_date}
                company={event.category_id?.name || "N/A"}
                category={event.category_id?.name || "Uncategorized"}
              />
            ))}
          </div>
        )}
      </div>
      <Filters onApplyFilters={handleApplyFilters} /> {/* Pass the handler as a prop */}
    </div>
  );
};

export default HomePage;
