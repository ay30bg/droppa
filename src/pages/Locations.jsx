import React, { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa6";
import { MapPin } from "lucide-react";
import "../styles/location.css";

export default function LocationPage({ setLocation, closePage }) {
  const [search, setSearch] = useState("");

  // Dummy suggestions (Google style)
  const suggestions = [
    "Lekki Phase 1",
    "Victoria Island",
    "Ikeja GRA",
    "Yaba - Herbert Macaulay",
    "Surulere - Adeniran Ogunsanya",
  ];

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (address) => {
    setLocation(address);
    closePage();
  };

  return (
    <div className="location-page">
      {/* Page Header */}
      <div className="location-header">
        <h3>Delivery Address</h3>
        <FiX size={24} onClick={closePage} className="close-btn" />
      </div>

      {/* Search bar */}
      <div className="location-search">
        <div className="search-wrapper">
          <FiSearch className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search for your address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <FiX
              size={16}
              className="clear-icon"
              onClick={() => setSearch("")}
            />
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions-list">
        {filtered.map((item) => (
          <div key={item} className="suggestion-item" onClick={() => handleSelect(item)}>
            <MapPin size={18} className="suggestion-icon" />
            <div className="suggestion-text">{item}</div>
          </div>
        ))}
      </div>

      {/* Use Current Location */}
      <div
        className="use-location"
        onClick={() => handleSelect("Using current location...")}
      >
       <FaLocationArrow className="arrow-icon" size={16}/>  Use Current Location
      </div>
    </div>
  );
}
