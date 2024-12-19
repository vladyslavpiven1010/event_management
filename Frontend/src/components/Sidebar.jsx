import React from "react";
import "./../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, onLogout, onTabChange }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`); // Navigate to the profile page with the user's ID
    }
  };

  const handleTabSelection = (e) => {
    onTabChange(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar" onClick={handleAvatarClick} style={{ cursor: "pointer" }}></div>
        <h2>{user.name}</h2>
        <p>{user.company}</p>
        <div className="user-actions">
            <button onClick={onLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
      </div>
      <select className="dropdown" onChange={handleTabSelection}>
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
