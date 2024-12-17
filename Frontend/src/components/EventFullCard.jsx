import React from "react";
import "./../styles/EventFullCard.css";

const EventFullCard = ({ event, onClose, onBuyTicket }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{event.description}</h2>
        <p><strong>Category:</strong> {event.category_id?.name || "Uncategorized"}</p>
        <p><strong>Tickets Available:</strong> {event.ticket_count}</p>
        <p><strong>Ticket Price:</strong> ${event.ticket_price}</p>
        <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> Lat: {event.lat}, Lng: {event.lng}</p>
        <button className="buy-button" onClick={() => onBuyTicket(event.id)}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventFullCard;