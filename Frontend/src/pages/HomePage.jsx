import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Filters from "../components/Filters";
import EventCard from "../components/EventCard";
import "./../styles/Home.css";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure the key is "token"
        if (!token) throw new Error("No token found");
  
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.sub;
  
        const response = await fetch(`http://localhost:5001/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUser(data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      }
    };
  
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/event", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Error loading events:", err.message);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchEvents();
  }, []);

  // const handleApplyFilters = (filters) => {
  //   fetchEvents(filters); // Fetch events with the selected filters
  // };


  if (error) {
    return <div>Error loading user data: {error}</div>;
  }

  return (
    <div className="home-page">
      {isLoggedIn ? (
        <Sidebar user={user} /> // Render the logged-in sidebar
      ) : (
        <div className="sidebar"> {/* Render guest sidebar */}
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
      <Filters />
    </div>
  );
};

export default HomePage;
