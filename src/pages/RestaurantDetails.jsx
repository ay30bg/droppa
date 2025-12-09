import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants.js";
import "../styles/restaurantdetails.css";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find restaurant immediately
  const selectedRestaurant = restaurants.find((r) => r.id === parseInt(id));

  // Basic fallback BEFORE any return — no hooks after this
  if (!selectedRestaurant) {
    return <div className="not-found">Restaurant not found</div>;
  }

  // Hooks MUST be before any logic that returns JSX
  const [cart, setCart] = useState([]);

  // Menu categories
  const categories = useMemo(() => {
    const unique = new Set(selectedRestaurant.menu.map((item) => item.category));
    return [...unique];
  }, [selectedRestaurant]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="restaurant-details">

      {/* Top header */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2>{selectedRestaurant.name}</h2>
      </div>

      {/* Restaurant Summary */}
      <div className="restaurant-summary">
        <h1>{selectedRestaurant.name}</h1>
        <p className="restaurant-meta">
          {selectedRestaurant.rating} ⭐ • {selectedRestaurant.deliveryTime} mins • ₦₦
        </p>
        <p className="restaurant-desc">{selectedRestaurant.description}</p>
      </div>

      {/* Menu */}
      <div className="menu-section">
        {categories.map((cat) => (
          <div key={cat} className="menu-category">
            <h3 className="category-title">{cat}</h3>

            {selectedRestaurant.menu
              .filter((m) => m.category === cat)
              .map((item) => (
                <div key={item.id} className="menu-item">

                  <div className="menu-info">
                    <h4>{item.name}</h4>
                    <p className="menu-sub">{item.details}</p>
                    <p className="menu-price">₦{item.price.toLocaleString()}</p>
                  </div>

                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Cart summary */}
      {cart.length > 0 && (
        <div className="checkout-bar">
          <div>{cart.length} item(s)</div>
          <div className="checkout-btn">Proceed to Checkout</div>
        </div>
      )}
    </div>
  );
}
