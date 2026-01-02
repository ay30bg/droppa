import React, { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa6";
import { MapPin } from "lucide-react";
import "../styles/location.css";

export default function LocationPage({ setLocation, closePage }) {
  const [search, setSearch] = useState("");

  const suggestions = [
  "Oke-Fia",
  "Ibikunle Area",
  "Ayetoro",
  "Ogooluwa",
  "Dada Estate",
];

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Detect GPS location + convert to address
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location access not supported on this device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          const address = data.display_name || "Unknown Location";

          // ✅ Update Header
          setLocation(address);

          // ✅ Persist after refresh
          localStorage.setItem("droppa_user_location", address);

          closePage();
        } catch (err) {
          alert("Unable to fetch address");
        }
      },

      () => alert("Location permission denied")
    );
  };

  const handleSelect = (address) => {
    setLocation(address);
    localStorage.setItem("droppa_user_location", address);
    closePage();
  };

  return (
    <div className="location-page">
      <div className="location-header">
        <h3>Delivery Address</h3>
        <FiX size={24} onClick={closePage} className="close-btn" />
      </div>

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

      <div className="suggestions-list">
        {filtered.map((item) => (
          <div
            key={item}
            className="suggestion-item"
            onClick={() => handleSelect(item)}
          >
            <MapPin size={18} className="suggestion-icon" />
            <div className="suggestion-text">{item}</div>
          </div>
        ))}
      </div>

      <div className="use-location" onClick={detectLocation}>
        <FaLocationArrow className="arrow-icon" size={16} />
        Use Current Location
      </div>
    </div>
  );
}
