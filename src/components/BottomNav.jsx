import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiMapPin, FiBox, FiUser,  } from "react-icons/fi";
import "../styles/bottomnav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className="nav-item">
        <FiHome size={20} className="icon" />
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/track" className="nav-item">
        <FiMapPin size={20} className="icon" />
        <span className="label">Discover</span>
      </NavLink>
      <NavLink to="/orders" className="nav-item">
        <FiBox size={20} className="icon" />
        <span className="label">Orders</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <FiUser size={20} className="icon" />
        <span className="label">Account</span>
      </NavLink>
    </nav>
  );
}
