import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Filters.css";

const Filters = ({ onApplyFilters }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [ticketPriceRange, setTicketPriceRange] = useState([0, 100]); // Example range
  const [isFreePlaces, setIsFreePlaces] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [error, setError] = useState("");

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5001/category");
        setCategories(response.data); // Assuming response.data is the array of categories
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      categories: selectedCategories,
      ticketPriceRange,
      isFreePlaces,
      sortOption,
    };
    onApplyFilters(filters); // Call the parent handler to apply the filters
  };

  return (
    <div className="filters">
      <h3>Sorting</h3>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="sort-select"
      >
        <option value="">Select an option</option>
        <option value="event_date">Date</option>
        <option value="ticket_price">Ticket price</option>
      </select>

      <h3>Filters</h3>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="categories">
          <p>Categories</p>
          {categories.map((category) => (
            <label key={category.id} className="checkbox-label">
              <input
                type="checkbox"
                value={category.name}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
      )}

      <div className="ticket-price">
        <p>Tickets Price</p>
        <div className="price-range">
          <input
            type="number"
            value={ticketPriceRange[0]}
            onChange={(e) =>
              setTicketPriceRange([Number(e.target.value), ticketPriceRange[1]])
            }
          />
          <span>—</span>
          <input
            type="number"
            value={ticketPriceRange[1]}
            onChange={(e) =>
              setTicketPriceRange([ticketPriceRange[0], Number(e.target.value)])
            }
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={ticketPriceRange[1]}
          onChange={(e) =>
            setTicketPriceRange([ticketPriceRange[0], Number(e.target.value)])
          }
        />
      </div>

      <div className="is-free-places">
        <label>
          <input
            type="checkbox"
            checked={isFreePlaces}
            onChange={(e) => setIsFreePlaces(e.target.checked)}
          />
          Is free places
        </label>
      </div>

      <button onClick={handleApplyFilters} className="apply-filters-btn">
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
