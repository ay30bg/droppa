import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiStar, FiTruck } from "react-icons/fi";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurant.js";
import "../styles/restaurantdetails.css";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = featuredRestaurants.find(
    (res) => res.id === parseInt(id)
  );

  if (!restaurant) return <p>Restaurant not found</p>;

  const menu = restaurantMenus[id] || [];
  const timeText = getRestaurantTimeDisplay(restaurant.time);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <div className="restaurant-page">

      {/* Header */}
      <div className="restaurant-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div>
          <h2>{restaurant.name}</h2>
          <div className="restaurant-sub">
            <span>⭐ {restaurant.rating}</span>
            <span>• {restaurant.orders} reviews</span>
            <span>• {restaurant.street}</span>
            <span>• {timeText}</span>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="restaurant-info-row">
        <div className="info-pill">
          <FiStar /> {restaurant.rating}
        </div>
        <div className="info-pill">
          <FiTruck /> From ₦{restaurant.price}
        </div>
        <div className={`info-pill ${timeText === "Closed" ? "closed" : ""}`}>
          {timeText}
        </div>
      </div>

      {/* MENU */}
      <h3 className="menu-title">Menu</h3>

      {menu.map((item) => (
        <div key={item.id} className="menu-card">
          <div className="menu-text">
            <h4 className="menu-name">{item.name}</h4>
            <p className="menu-desc">
              • Well prepared meal  
              • Customer favourite  
              • Available every day
            </p>
            <p className="menu-price">₦{item.price}</p>
          </div>

          <button className="menu-add-btn" onClick={() => addToCart(item)}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
}
