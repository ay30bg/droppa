import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiMapPin, FiShoppingBag, FiUser,  } from "react-icons/fi";
import "../styles/bottomnav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className="nav-item">
        <FiHome size={25} className="icon" />
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/restaurant" className="nav-item">
        <FiMapPin size={25} className="icon" />
        <span className="label">Restaurants</span>
      </NavLink>
      <NavLink to="/orders" className="nav-item">
        <FiShoppingBag size={25} className="icon" />
        <span className="label">Orders</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item">
        <FiUser size={25} className="icon" />
        <span className="label">Account</span>
      </NavLink>
    </nav>
  );
}

