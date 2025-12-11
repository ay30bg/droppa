import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurants";
import "../styles/restaurantdetails.css";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = featuredRestaurants.find((r) => r.id === Number(id));
  const menu = restaurantMenus[id] || [];

  const [shrunk, setShrunk] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef();
  const sectionRefs = useRef({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShrunk(scrollRef.current.scrollTop > 30);
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () =>
      scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  if (!restaurant) return <div>Restaurant not found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  const categories = ["All", "Popular", "Recommended"];

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

  const changeQty = (id, type) => {
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

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionRefs.current[cat]) {
      sectionRefs.current[cat].scrollIntoView({ behavior: "smooth" });
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cd-page" ref={scrollRef}>
      {/* ──────────── HEADER ──────────── */}
      <div className={`cd-header ${shrunk ? "shrunk" : ""}`}>
        <button onClick={() => navigate(-1)} className="cd-back">
          ←
        </button>
        <span className="cd-title">{restaurant.name}</span>
      </div>

      {/* ──────────── RESTAURANT INFO ──────────── */}
      <div className="cd-rest-info">
        {/* Rating, Orders, Time, Avg Price */}
        <div className="cd-sub-info">
          <span>⭐ {restaurant.rating}</span>
          <span>|</span>
          <span>{restaurant.orders} orders</span>
          <span>|</span>
          <span>{restaurant.time}</span>
          <span>|</span>
          <span>₦{restaurant.price} avg</span>
        </div>

        {/* Street / Location */}
        <div className="cd-street-info">📍 {restaurant.street}</div>

        {/* Tags / Badges */}
        <div className="cd-tags">
          {restaurant.rating >= 4.8 && (
            <span className="cd-badge top-rated">Top Rated</span>
          )}
          {restaurant.orders > 1000 && (
            <span className="cd-badge popular">Popular</span>
          )}
        </div>

        {/* Delivery Fee or Closed */}
        {isClosed ? (
          <div className="cd-closed-banner">
            Closed — Opens tomorrow morning
          </div>
        ) : (
          <div className="cd-delivery-box">
            <span>🚚 Delivery Fee: ₦200 | ⏱️ {restaurant.time}</span>
          </div>
        )}
      </div>

      {/* ──────────── CATEGORIES ──────────── */}
      <div className="cd-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => scrollToCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ──────────── MENU LIST ──────────── */}
      <div className="cd-menu-section">
        {loading ? (
          <>
            <div className="cd-skeleton-card"></div>
            <div className="cd-skeleton-card"></div>
            <div className="cd-skeleton-card"></div>
          </>
        ) : (
          <>
            <h3
              className="cd-section-title"
              ref={(el) => (sectionRefs.current["Recommended"] = el)}
            >
              Recommended
            </h3>

            {menu.map((item) => {
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
          </>
        )}
      </div>

      {/* ──────────── STICKY CART BAR ──────────── */}
      {cart.length > 0 && (
        <div className="cd-cart-bar" onClick={() => alert("Checkout modal…")}>
          <div>{cart.reduce((acc, it) => acc + it.qty, 0)} item(s)</div>
          <div className="cd-cart-total">₦{total}</div>
        </div>
      )}
    </div>
  );
}
