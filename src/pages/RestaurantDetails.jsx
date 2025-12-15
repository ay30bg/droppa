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

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [shrunk, setShrunk] = useState(false);
  const [fav, setFav] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    setTimeout(() => setLoading(false), 900);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShrunk(scrollRef.current.scrollTop > 20);
      }
    };
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () =>
      scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  if (!restaurant) return <div>Restaurant not found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  const addToCart = (item) => {
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 700);

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

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const itemCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="cd-page" ref={scrollRef}>
      {/* HEADER */}
      <div className={`cd-header ${shrunk ? "shrunk" : ""}`}>
        <div className="cd-header-left">
          <button className="cd-back" onClick={() => navigate(-1)}>←</button>
          <span className="cd-title">{restaurant.name}</span>
        </div>

        <div className="cd-header-right">
          <button className="cd-icon" onClick={() => alert("Share link")}>⤴︎</button>
          <button
            className={`cd-icon ${fav ? "active" : ""}`}
            onClick={() => setFav(!fav)}
          >
            ♥
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="cd-rest-info">
        <div className="cd-meta">
          <span className={`cd-status ${isClosed ? "closed" : "open"}`}>
            ● {isClosed ? "Closed" : "Open now"}
          </span>
          <span>⭐ {restaurant.rating} ({restaurant.orders})</span>
          <span>• {restaurant.time}</span>
          <span>• ₦200</span>
        </div>

        <div className="cd-street">{restaurant.street}</div>

        {!isClosed && (
          <div className="cd-hint">
            {restaurant.orders > 1000
              ? "Busy right now · Delivery may take longer"
              : "Fast delivery today"}
          </div>
        )}

        {isClosed && <div className="cd-hint">Opens tomorrow morning</div>}
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
          menu.map((item) => {
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
                    className={`cd-add-btn ${addedId === item.id ? "added" : ""}`}
                    onClick={() => addToCart(item)}
                  >
                    {addedId === item.id ? "Added" : "Add"}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CART BAR */}
      {cart.length > 0 && (
        <div className="cd-cart-bar">
          <span>View cart · {itemCount} items</span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
