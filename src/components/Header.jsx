import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import Location from "../pages/Locations"; // NEW PAGE
import "../styles/header.css";

export default function Header() {
  const [location, setLocation] = useState(""); // initially empty
  const [showLocationPage, setShowLocationPage] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const openLocationPage = () => setShowLocationPage(true);
  const closeLocationPage = () => setShowLocationPage(false);

  return (
    <>
      {/* --------- HEADER --------- */}
      <header className="droppa-header">
        {/* Location Picker */}
        <div className="location-picker" onClick={openLocationPage}>
          <span className="map-pin-wrapper">
            <MapPin
              size={20}
              color="#eee"
              fill="#014F50"
              strokeWidth={1.5}
            />
          </span>

          <span className="address">
            {location ? location : "Enter your Address"}
          </span>

          <FiChevronDown size={16} className="arrow" />
        </div>

        {/* Filter Button */}
        <div className="header-right">
          <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <LuSettings2 size={20} /> Filters
          </button>
        </div>
      </header>

      {/* Filters Below Header */}
      {showFilters && (
        <div className="filters-dropdown-under">
          {["Fast Delivery", "Rating 4.5+", "Near Me", "Promos", "Discounts", "Top Rated", "New", "Popular"].map(
            (filter) => (
              <div key={filter} className="filter-item">
                {filter}
              </div>
            )
          )}
        </div>
      )}

      {/* Location Page Modal */}
      {showLocationPage && (
        <Location
          setLocation={setLocation}
          closePage={closeLocationPage}
        />
      )}
    </>
  );
}

