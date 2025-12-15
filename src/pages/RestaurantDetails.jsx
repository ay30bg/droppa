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
  const menu = restaurantMenus[id] || [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const scrollRef = useRef();
  const sectionRefs = useRef({});

  useEffect(() => setTimeout(() => setLoading(false), 1000), []);

  if (!restaurant) return <div>Restaurant not found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  const categories = ["All", ...Array.from(new Set(menu.map((item) => item.category)))];

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists)
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: type === "inc" ? p.qty + 1 : p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const toggleCart = () => setCartOpen((prev) => !prev);

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getDynamicStatus = (time) => {
    // Parse "10:00 AM - 10:00 PM" format
    const now = new Date();
    const [openStr, closeStr] = time.split(" - ");
    const parseTime = (str) => {
      let [h, mPart] = str.split(":");
      let m = parseInt(mPart);
      let isPM = str.includes("PM");
      h = parseInt(h);
      if (isPM && h !== 12) h += 12;
      if (!isPM && h === 12) h = 0;
      return { h, m };
    };
    const open = parseTime(openStr);
    const close = parseTime(closeStr);

    const openDate = new Date();
    openDate.setHours(open.h, open.m, 0);
    const closeDate = new Date();
    closeDate.setHours(close.h, close.m, 0);

    if (now >= openDate && now <= closeDate) return `Open now (closes at ${closeStr})`;
    return `Closed (opens at ${openStr})`;
  };

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
          <FiShare2 size={20} onClick={() => setShareOpen(true)} />
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

      {/* CART BUTTON */}
      {cart.length > 0 && !cartOpen && (
        <div className="cd-cart-bar" onClick={toggleCart}>
          <span>{cart.reduce((a, b) => a + b.qty, 0)} items</span>
          <span>₦{total}</span>
        </div>
      )}

      {/* CART DRAWER */}
      <div className={`cd-cart-drawer ${cartOpen ? "open" : ""}`}>
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.id} className="cd-cart-item">
            <span>{item.name}</span>
            <div className="cd-qty-box">
              <button onClick={() => changeQty(item.id, "dec")}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => changeQty(item.id, "inc")}>+</button>
            </div>
            <span>₦{item.price * item.qty}</span>
          </div>
        ))}
        <button className="cd-checkout-btn">Checkout ₦{total}</button>
      </div>

      {/* SHARE MODAL */}
      {shareOpen && (
        <div className="cd-share-modal" onClick={() => setShareOpen(false)}>
          <div className="cd-share-content" onClick={(e) => e.stopPropagation()}>
            <h4>Share this restaurant</h4>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
              Copy Link
            </button>
            <button
              onClick={() =>
                window.open(`https://wa.me/?text=${window.location.href}`, "_blank")
              }
            >
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
