import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FiMapPin, FiUser, FiShoppingCart, FiChevronDown } from "react-icons/fi";
import "../styles/header.css";

export default function Header() {
  const { cart } = useContext(CartContext);
  const [location, setLocation] = useState("Lagos");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano"];

  const toggleLocationDropdown = () => setShowLocationDropdown(!showLocationDropdown);

  const selectLocation = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

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
              <div
                key={loc}
                className="location-item"
                onClick={() => selectLocation(loc)}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile & Cart */}
      <div className="header-right">
        <Link to="/profile" className="profile-btn">
          <FiUser size={20} />
        </Link>
        <Link to="/cart" className="cart-btn">
          <FiShoppingCart size={20} />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
}
