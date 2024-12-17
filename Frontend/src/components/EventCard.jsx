import React from "react";
import "./../styles/EventCard.css";

const EventCard = ({ name, tickets, date, desc, category, onViewDetails }) => {
  return (
    <div className="event-card">
      <div className="event-header">
        <h3>{name}</h3>
        <span className="event-category">{category}</span>
      </div>
      <div className="event-details">
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {desc}</p>
        <p><strong>Tickets Available:</strong> {tickets}</p>
      </div>
      <button className="event-button" onClick={onViewDetails}>View Details</button>
    </div>
  );
};

export default EventCard;
