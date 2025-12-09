// src/pages/RestaurantDetails.jsx
import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { featuredRestaurants, restaurantMenus, getRestaurantTimeDisplay } from "../data/restaurant";
import "../styles/restaurantdetails.css";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurantId = parseInt(id);

  // ----- Find restaurant first (all hooks below) -----
  const restaurant = featuredRestaurants.find((r) => r.id === restaurantId);
  if (!restaurant) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <p>Restaurant not found!</p>
      </div>
    );
  }

  // ---------- Hooks ----------
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [favourite, setFavourite] = useState(false);

  const menuSections = restaurantMenus[restaurantId] || [];

  const categories = useMemo(() => {
    const unique = new Set(menuSections.map((m) => m.category));
    return [...unique];
  }, [menuSections]);

  // Initialize active category
  if (!activeCategory && categories.length > 0) {
    setActiveCategory(categories[0]);
  }

  const toggleFavourite = () => setFavourite((f) => !f);

  const filteredItems = useMemo(() => {
    let items = menuSections
      .filter((s) => activeCategory ? s.category === activeCategory : true)
      .flatMap((s) => s.items);
    if (searchText) {
      const q = searchText.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || (i.details && i.details.toLowerCase().includes(q)));
    }
    return items;
  }, [menuSections, activeCategory, searchText]);

  const addToCart = (item) => {
    if (isClosed) return;
    setCart((prev) => [...prev, item]);
  };

  const cartTotal = cart.reduce((sum, it) => sum + it.price, 0);

  // Simple open/closed logic based on time
  const deliveryTimeText = getRestaurantTimeDisplay(restaurant.time);
  const closed = deliveryTimeText === "Closed";
  if (closed !== isClosed) setIsClosed(closed);

  return (
    <div className="restaurant-details">

      {/* Header */}
      <div className="rd-header">
        <button className="rd-back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="rd-header-info">
          <h1>{restaurant.name}</h1>
          <div className="rd-meta">{restaurant.rating} ⭐ • {restaurant.time} mins • {restaurant.street}</div>
        </div>
        <button className={`rd-fav ${favourite ? "active" : ""}`} onClick={toggleFavourite}>❤️</button>
      </div>

      {/* Categories */}
      <div className="rd-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`rd-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search menu..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rd-search-input"
        />
      </div>

      {/* Menu Items */}
      <div className="rd-menu-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="rd-menu-item">
            <div className="rd-menu-info">
              <h3>{item.name}</h3>
              {item.details && <p className="rd-menu-sub">{item.details}</p>}
              <span className="rd-menu-price">₦{item.price.toLocaleString()}</span>
            </div>
            <button className="rd-add-btn" onClick={() => addToCart(item)} disabled={isClosed}>
              {isClosed ? "Closed" : "Add"}
            </button>
          </div>
        ))}
        {filteredItems.length === 0 && <div className="rd-empty">No items found</div>}
      </div>

      {/* Sticky Cart */}
      {cart.length > 0 && (
        <div className="rd-cart-bar">
          <div>{cart.length} item(s)</div>
          <div>₦{cartTotal.toLocaleString()}</div>
          <button className="rd-checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
