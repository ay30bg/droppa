import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurants";

import "../styles/restaurantdetails.css"; // create this

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = featuredRestaurants.find((r) => r.id === Number(id));
  const menu = restaurantMenus[id] || [];

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter menu using search
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, qty: type === "inc" ? p.qty + 1 : p.qty - 1 }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (!restaurant) return <div>Restaurant Not Found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  return (
    <div className="restaurant-page">
      {/* Back Button */}
      <div className="top-nav">
        <button onClick={() => navigate(-1)} className="back-btn">←</button>
        <h3>{restaurant.name}</h3>

        {/* Favourite */}
        <span
          className={`fav ${favorites ? "active" : ""}`}
          onClick={() => setFavorites(!favorites)}
        >
          ❤️
        </span>
      </div>

      {/* Hero Image */}
      <div className="hero">
        <img src={restaurant.image} alt="" />
        {isClosed && <span className="closed-badge">Closed</span>}
      </div>

      {/* Restaurant Info */}
      <div className="rest-info">
        <h2>{restaurant.name}</h2>
        <div className="details">
          <span>⭐ {restaurant.rating}</span>
          <span>•</span>
          <span>{restaurant.street}</span>
          <span>•</span>
          <span>{isClosed ? "Closed" : restaurant.time}</span>
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["All", "Popular", "Recommended"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="skeleton-wrapper">
          {[1, 2, 3, 4].map((i) => (
            <div className="skeleton" key={i}></div>
          ))}
        </div>
      ) : (
        <div className="menu-list">
          {filteredMenu.map((item) => (
            <div className="menu-item" key={item.id} onClick={() => setSelectedItem(item)}>
              <div>
                <h4>{item.name}</h4>
                <p>₦{item.price}</p>
              </div>
              <button className="add-btn">+</button>
            </div>
          ))}
        </div>
      )}

      {/* Item Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name}</h2>
            <p>₦{selectedItem.price}</p>

            {/* Add-ons */}
            <div className="addons">
              <h4>Add-ons</h4>
              <label><input type="checkbox" /> Extra Chicken + ₦300</label>
              <label><input type="checkbox" /> Cheese + ₦150</label>
              <label><input type="checkbox" /> Sauce + ₦100</label>
            </div>

            <button
              className="confirm-btn"
              onClick={() => {
                addToCart(selectedItem);
                setSelectedItem(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Sticky Cart */}
      {cart.length > 0 && (
        <div className="sticky-cart" onClick={() => alert("Proceed to checkout")}>
          <span>{cart.reduce((acc, i) => acc + i.qty, 0)} items</span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
