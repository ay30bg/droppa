import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "../styles/location.css";

export default function LocationPage({ setLocation, closePage }) {
  const [search, setSearch] = useState("");

  const suggestions = [
    "123 Herbert Macaulay Way",
    "Lekki Phase 1",
    "Victoria Island",
    "Ikeja GRA",
    "Yaba, Lagos",
  ];

  const handleSelect = (address) => {
    setLocation(address);
    closePage();
  };

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="location-page">
      {/* --- TOP HEADER --- */}
      <div className="location-header">
        <h3>Delivery Address</h3>
        <FiX size={24} onClick={closePage} className="close-btn" />
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="location-search">
        <input
          type="text"
          placeholder="Search for your address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* --- SUGGESTIONS --- */}
      <div className="suggestions-list">
        {filtered.map((item) => (
          <div
            key={item}
            className="suggestion-item"
            onClick={() => handleSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* --- USE CURRENT LOCATION --- */}
      <div className="use-location" onClick={() => handleSelect("Using current location...")}>
        📍 Use Current Location
      </div>
    </div>
  );
}
