import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const restaurant = featuredRestaurants.find((r) => r.id === Number(id));
  const menu = restaurantMenus[Number(id)] || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef();
  const sectionRefs = useRef({});

  // ---------- CART STATE WITH LOCALSTORAGE PERSISTENCE ----------
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

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  // ---------- SMART BACK BUTTON ----------
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // go back to where user came from
    } else {
      navigate("/"); // fallback to Home if opened directly
    }
  };

  // ---------- NATIVE SHARE ----------
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
      alert("Link copied to clipboard");
    }
  };

  // ---------- CATEGORIES ----------
  const categories = [
    "All",
    ...Array.from(new Set(menu.map((item) => item.category))),
  ];

  // ---------- CART FUNCTIONS ----------
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

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---------- DYNAMIC OPEN/CLOSE ----------
  const getDynamicStatus = (time) => {
    if (!time || !time.includes("-")) return isClosed ? "Closed" : "Open";

    try {
      const now = new Date();
      const [openStr, closeStr] = time.split(" - ");

      const parseTime = (str) => {
        const [h, mPart] = str.split(":");
        const m = parseInt(mPart) || 0;
        const isPM = str.toUpperCase().includes("PM");
        let hour = parseInt(h);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        return { hour, m };
      };

      const open = parseTime(openStr);
      const close = parseTime(closeStr);

      const openDate = new Date();
      openDate.setHours(open.hour, open.m, 0);

      const closeDate = new Date();
      closeDate.setHours(close.hour, close.m, 0);

      if (now >= openDate && now <= closeDate) {
        return `Open now (closes at ${closeStr})`;
      }

      return `Closed (opens at ${openStr})`;
    } catch {
      return isClosed ? "Closed" : "Open";
    }
  };

  return (
    <div className="cd-page" ref={scrollRef}>
      {/* HEADER */}
      <div className="cd-header">
        <div className="cd-header-left">
          <button className="cd-back" onClick={handleBack}>
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

      {/* RESTAURANT INFO */}
      <div className="cd-rest-info">
        <div className="cd-location-status">
          <span className="cd-street">{restaurant.street}</span>
          <span className="cd-divider">|</span>
          <span className={`cd-status ${isClosed ? "closed" : "open"}`}>
            {getDynamicStatus(restaurant.time)}
          </span>
        </div>

        <div className="cd-meta">
          <div className="cd-meta-item">
            <div className="cd-meta-label">Ratings</div>
            <div className="cd-meta-value">
              <FiStar size={16} /> {restaurant.rating} ({restaurant.orders})
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

      {/* CATEGORIES */}
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
                                <button onClick={() => changeQty(item.id, "dec")}>
                                  −
                                </button>
                                <span>{inCart.qty}</span>
                                <button onClick={() => changeQty(item.id, "inc")}>
                                  +
                                </button>
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
        <div
          className="cd-cart-bar"
          onClick={() =>
            navigate("/checkout", { state: { cart, restaurant } })
          }
        >
          <span>{cart.reduce((a, b) => a + b.qty, 0)} items</span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
