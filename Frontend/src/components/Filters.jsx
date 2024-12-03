import React, { useState } from "react";
import "./../styles/Filters.css";

const Filters = ({ onApplyFilters }) => {
  const [sortBy, setSortBy] = useState("event_date");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByTicketPrice, setFilterByTicketPrice] = useState([]);

  const handleApply = () => {
    onApplyFilters({
      sortBy,
      sortOrder,
      filterByCategory,
      filterByTicketPrice,
    });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="event_date">Event Date</option>
          <option value="ticket_price">Ticket Price</option>
          <option value="name">Event Name</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort Order:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Category:</label>
        <input
          type="text"
          placeholder="Enter categories, comma-separated"
          onChange={(e) => setFilterByCategory(e.target.value.split(","))}
        />
      </div>
      <div className="filter-group">
        <label>Ticket Price:</label>
        <input
          type="text"
          placeholder="Enter price ranges, comma-separated"
          onChange={(e) => setFilterByTicketPrice(e.target.value.split(","))}
        />
      </div>
      <button onClick={handleApply}>Apply Filters</button>
    </div>
  );
};


export default Filters;
