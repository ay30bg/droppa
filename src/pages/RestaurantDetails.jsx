import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiTruck, FiStar } from "react-icons/fi";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";
import "../styles/restaurantdetails.css";

// Restaurants data
const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Chicken Republic", image: image1, rating: 4.5, orders: 800, price: 550, street: "Igbona", time: "20-25 min" },
  { id: 4, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

// Menu data
const restaurantMenus = {
  1: [
    { id: 1, name: "Chicken Burger", price: 1500 },
    { id: 2, name: "Fried Chicken (2pcs)", price: 1200 },
    { id: 3, name: "Chicken Wrap", price: 1000 },
  ],
  2: [
    { id: 1, name: "Beef Steak", price: 2500 },
    { id: 2, name: "Veggie Salad", price: 1200 },
  ],
  3: [
    { id: 1, name: "Chicken Nuggets", price: 900 },
    { id: 2, name: "Fries", price: 500 },
  ],
  4: [
    { id: 1, name: "Grilled Fish", price: 2000 },
    { id: 2, name: "Plantain Chips", price: 600 },
  ],
};

function getRestaurantTimeDisplay(time) {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 8 ? "Closed" : time;
}

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const restaurant = featuredRestaurants.find((res) => res.id === parseInt(id));
  if (!restaurant) return <p>Restaurant not found!</p>;

  const menu = restaurantMenus[id] || [];
  const timeText = getRestaurantTimeDisplay(restaurant.time);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item) => setCart([...cart, item]);
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
              <button onClick={() => addToCart(item)}>Add</button>
            </div>
          </div>
        ))}
      </div>

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
