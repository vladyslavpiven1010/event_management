import React from "react";
import "./../styles/Sidebar.css";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <h2>{user.name}</h2>
        <p>{user.company}</p>
      </div>
      <select className="dropdown">
        <option value="events">Events</option>
        <option value="notifications">Notifications</option>
        {/* Add other options here */}
      </select>
      <div className="settings">
        <a href="/settings">Settings</a>
        <a href="/help">Help</a>
        <a href="/faq">F.A.Q</a>
      </div>
    </div>
  );
};

export default Sidebar;
