import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  featuredRestaurants,
  restaurantMenus,
  getRestaurantTimeDisplay,
} from "../data/restaurants";
import "../styles/restaurantdetails.css";
import { FiArrowLeft, FiShare2, FiHeart, FiStar } from "react-icons/fi";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 detect where user came from
  const from = location.state?.from || "/";

  const restaurant = featuredRestaurants.find(
    (r) => r.id === Number(id)
  );
  const menu = restaurantMenus[Number(id)] || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef();
  const sectionRefs = useRef({});

  // ---------- CART STATE ----------
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("restaurant_cart");
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed[id] || [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("restaurant_cart");
    const parsed = saved ? JSON.parse(saved) : {};
    parsed[id] = cart;
    localStorage.setItem("restaurant_cart", JSON.stringify(parsed));
  }, [cart, id]);

  // ---------- LOADING ----------
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!restaurant) return <div>Restaurant not found</div>;

  const isClosed =
    getRestaurantTimeDisplay(restaurant.time) === "Closed";

  // ---------- SHARE ----------
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: `Check out ${restaurant.name}`,
          url: window.location.href,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied");
    }
  };

  // ---------- CATEGORIES ----------
  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  // ---------- CART FUNCTIONS ----------
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      return exists
        ? prev.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + 1 } : p
          )
        : [...prev, { ...item, qty: 1 }];
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cd-page" ref={scrollRef}>
      {/* HEADER */}
      <div className="cd-header">
        <div className="cd-header-left">
          <button
            className="cd-back"
            onClick={() => navigate(from)}
          >
            <FiArrowLeft size={20} />
          </button>
          <span className="cd-title">{restaurant.name}</span>
        </div>

        <div className="cd-header-right">
          <FiShare2 size={20} onClick={handleNativeShare} />
          <FiHeart
            size={20}
            className={`cd-icon-btn ${favorite ? "liked" : ""}`}
            onClick={() => setFavorite(!favorite)}
          />
        </div>
      </div>

      {/* INFO */}
      <div className="cd-rest-info">
        <div className="cd-location-status">
          <span className="cd-street">{restaurant.street}</span>
          <span className="cd-divider">|</span>
          <span className={`cd-status ${isClosed ? "closed" : "open"}`}>
            {restaurant.time}
          </span>
        </div>

        <div className="cd-meta">
          <div className="cd-meta-item">
            <div className="cd-meta-label">Ratings</div>
            <div className="cd-meta-value">
              <FiStar size={16} /> {restaurant.rating} (
              {restaurant.orders})
            </div>
          </div>

          <div className="cd-meta-item">
            <div className="cd-meta-label">Preparation Time</div>
            <div className="cd-meta-value">{restaurant.time}</div>
          </div>

          <div className="cd-meta-item">
            <div className="cd-meta-label">Delivery Fee</div>
            <div className="cd-meta-value">₦200</div>
          </div>
        </div>
      </div>

      {/* CART BAR */}
      {cart.length > 0 && (
        <div
          className="cd-cart-bar"
          onClick={() =>
            navigate("/checkout", {
              state: { cart, restaurant },
            })
          }
        >
          <span>
            {cart.reduce((a, b) => a + b.qty, 0)} items
          </span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
