// src/pages/RestaurantDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurants";
import "../styles/restaurantdetails.css";
import { FiArrowLeft, FiShare2, FiHeart } from "react-icons/fi";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = featuredRestaurants.find((r) => r.id === Number(id));
  const menu = restaurantMenus[id] || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef();
  const sectionRefs = useRef({});

  useEffect(() => setTimeout(() => setLoading(false), 1000), []);

  if (!restaurant) return <div>Restaurant not found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";
  const categories = ["All", ...Array.from(new Set(menu.map((item) => item.category)))];

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: type === "inc" ? p.qty + 1 : p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cd-page" ref={scrollRef}>
      {/* HEADER */}
      <div className="cd-header">
        <div className="cd-header-left">
          <button className="cd-back" onClick={() => navigate("/restaurant")}>
            <FiArrowLeft size={20} />
          </button>
          <span className="cd-title">{restaurant.name}</span>
        </div>

        <div className="cd-header-right">
          <FiShare2 size={20} />
          <FiHeart size={20} />
        </div>
      </div>

      {/* RESTAURANT INFO */}
      <div className="cd-rest-info">
        <div className="cd-meta">
          <span>⭐ {restaurant.rating} ({restaurant.orders})</span>
          <span>• {restaurant.time}</span>
          <span>• ₦200</span>
        </div>
        <div className="cd-street">{restaurant.street}</div>
        {isClosed && <div className="cd-closed">Closed</div>}
      </div>

      {/* CATEGORIES */}
      <div className="cd-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU */}
      <div className="cd-menu-section">
        {loading ? (
          <>
            <div className="cd-skeleton-card" />
            <div className="cd-skeleton-card" />
            <div className="cd-skeleton-card" />
          </>
        ) : (
          categories
            .filter((c) => c !== "All")
            .map(
              (cat) =>
                (activeCategory === "All" || activeCategory === cat) && (
                  <div key={cat}>
                    <h3
                      className="cd-section-title"
                      ref={(el) => (sectionRefs.current[cat] = el)}
                    >
                      {cat}
                    </h3>
                    {menu
                      .filter((item) => item.category === cat)
                      .map((item) => {
                        const inCart = cart.find((c) => c.id === item.id);
                        return (
                          <div className="cd-menu-item" key={item.id}>
                            <div className="cd-item-info">
                              <h4>{item.name}</h4>
                              {item.description && (
                                <p className="cd-subtext">{item.description}</p>
                              )}
                              <p className="cd-price">₦{item.price}</p>
                            </div>
                            {inCart ? (
                              <div className="cd-qty-box">
                                <button onClick={() => changeQty(item.id, "dec")}>−</button>
                                <span>{inCart.qty}</span>
                                <button onClick={() => changeQty(item.id, "inc")}>+</button>
                              </div>
                            ) : (
                              <button
                                className="cd-add-btn"
                                onClick={() => addToCart(item)}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )
            )
        )}
      </div>

      {/* CART BAR */}
      {cart.length > 0 && (
        <div className="cd-cart-bar">
          <span>{cart.reduce((a, b) => a + b.qty, 0)} items</span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
