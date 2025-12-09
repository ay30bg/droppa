import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiTruck, FiStar } from "react-icons/fi";
import "../styles/restaurantdetails.css";
import { featuredRestaurants, restaurantMenus, getRestaurantTimeDisplay } from "../data/restaurants";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);

  const restaurant = featuredRestaurants.find((res) => res.id === parseInt(id));
  if (!restaurant) return <p>Restaurant not found!</p>;

  const menu = restaurantMenus[id] || [];
  const timeText = getRestaurantTimeDisplay(restaurant.time);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item, event) => {
    const rect = event.target.getBoundingClientRect();
    setFlyingItem({
      name: item.name,
      startX: rect.left,
      startY: rect.top,
    });

    setTimeout(() => {
      setCart((prev) => [...prev, item]);
      setFlyingItem(null);
    }, 500);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="restaurant-details-container">
      {/* Header */}
      <div className="restaurant-header">
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        <h1>{restaurant.name}</h1>
        {restaurant.rating >= 4.8 && <span className="top-rated-badge">Top Rated</span>}
      </div>

      {/* Banner Image */}
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-banner" />

      {/* Info Cards */}
      <div className="info-cards">
        <div className="info-card">
          <FiStar className="icon" /> {restaurant.rating} ({restaurant.orders} reviews)
        </div>
        <div className="info-card">
          <FiTruck className="icon" /> From {restaurant.price} NGN | {timeText}
        </div>
        <div className={`info-card ${timeText === "Closed" ? "closed" : ""}`}>
          {timeText === "Closed" ? "Closed" : "Open"}
        </div>
      </div>

      {/* Menu */}
      <div className="menu-section">
        <h2>Menu</h2>
        {menu.map((item) => (
          <div key={item.id} className="menu-card">
            <span>{item.name}</span>
            <div className="menu-actions">
              <span>{item.price} NGN</span>
              <button onClick={(e) => addToCart(item, e)}>Add</button>
            </div>
          </div>
        ))}
      </div>

      {/* Flying item animation */}
      {flyingItem && (
        <div
          className="flying-item"
          style={{
            top: flyingItem.startY,
            left: flyingItem.startX,
          }}
        >
          {flyingItem.name}
        </div>
      )}

      {/* Sticky Cart */}
      {cart.length > 0 && (
        <div className="cart-section">
          <h3>Cart ({cart.length} items)</h3>
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-actions">
                <span>{item.price} NGN</span>
                <button onClick={() => removeFromCart(idx)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Total:</span>
            <span>{totalPrice} NGN</span>
          </div>
          <button className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}
