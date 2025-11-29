import React, { useState } from "react";
import { FiMapPin, FiFilter, FiChevronDown } from "react-icons/fi";
import "../styles/header.css";

export default function Header() {
  const [location, setLocation] = useState("Lagos");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano"];
  const filters = ["Fast Delivery", "Rating 4.5+", "Near Me", "Promos", "Discounts", "Top Rated", "New", "Popular"];

  const toggleLocationDropdown = () => setShowLocationDropdown(!showLocationDropdown);
  const selectLocation = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <header className="droppa-header">
      {/* Location Picker */}
      <div className="location-picker" onClick={toggleLocationDropdown}>
        <FiMapPin className="map-pin" size={18} />
        <span className="address">{location}</span>
        <FiChevronDown size={16} className={`arrow ${showLocationDropdown ? "open" : ""}`} />
        {showLocationDropdown && (
          <div className="location-dropdown">
            {locations.map((loc) => (
              <div key={loc} className="location-item" onClick={() => selectLocation(loc)}>
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Button */}
      <div className="header-right">
        <button className="filter-btn" onClick={toggleFilters}>
          <FiFilter size={20} /> Filters
        </button>
        {showFilters && (
          <div className="filters-dropdown">
            {filters.map((filter) => (
              <div key={filter} className="filter-item">
                {filter}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

