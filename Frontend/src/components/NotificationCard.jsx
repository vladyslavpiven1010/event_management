import React from "react";
import "../styles/NotificationCard.css"; // Import CSS for styling

const NotificationCard = ({ date, message, onClose }) => {
  return (
    <div className="notification-card">
      <span className="notification-date">{date}</span>
      <p className="notification-message">{message}</p>
      <button className="notification-close-btn" onClick={onClose}>
        &#10006;
      </button>
    </div>
  );
};

export default NotificationCard;
