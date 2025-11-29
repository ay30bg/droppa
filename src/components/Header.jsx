return (
  <>
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
      </div>
    </header>

    {/* --- Filters Dropdown UNDER header (not inside header) --- */}
    {showFilters && (
      <div className="filters-dropdown-under">
        {filters.map((filter) => (
          <div key={filter} className="filter-item">
            {filter}
          </div>
        ))}
      </div>
    )}
  </>
);
