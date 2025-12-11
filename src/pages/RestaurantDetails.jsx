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

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [shrunkHeader, setShrunkHeader] = useState(false);

  const pageRef = useRef();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (pageRef.current.scrollTop > 50) setShrunkHeader(true);
      else setShrunkHeader(false);
    };
    pageRef.current.addEventListener("scroll", handleScroll);
    return () => pageRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  if (!restaurant) return <div>Restaurant Not Found</div>;

  const isClosed = getRestaurantTimeDisplay(restaurant.time) === "Closed";

  // Filter menu by search & tab
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Cart operations
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

  const categories = ["All", "Popular", "Recommended"];

  return (
    <div className="restaurant-page" ref={pageRef}>
      {/* FLOATING HEADER */}
      <div className={`top-nav ${shrunkHeader ? "shrunk" : ""}`}>
        <button onClick={() => navigate(-1)} className="back-btn">
          ←
        </button>
        <h3>{restaurant.name}</h3>
        <span
          className={`fav ${favorites ? "active" : ""}`}
          onClick={() => setFavorites(!favorites)}
        >
          ❤️
        </span>
      </div>

      {/* RESTAURANT INFO */}
      <div className="rest-header">
        <div className="rest-name">{restaurant.name}</div>
        <div className="rest-info">
          <span className="rest-tag">⭐ {restaurant.rating}</span>
          <span className="rest-tag">{restaurant.street}</span>
          <span className="rest-tag">{isClosed ? "Closed" : restaurant.time}</span>
          <span className="rest-tag">₦{restaurant.price} avg</span>
        </div>

        {/* DELIVERY BAR */}
        <div className="delivery-bar">
          <span>🚚 Delivery: ₦200</span>
          <span>⏱ {restaurant.time}</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY SCROLL */}
      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeTab === cat ? "active" : ""}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU SECTION */}
      <div className="section-title">Menu</div>

      {loading ? (
        <div className="skeleton-wrapper">
          {[1, 2, 3, 4].map((i) => (
            <div className="skeleton" key={i}></div>
          ))}
        </div>
      ) : (
        <div className="menu-list">
          {filteredMenu.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <div className="menu-card" key={item.id}>
                <div className="left">
                  <h4>{item.name}</h4>
                  <p>₦{item.price}</p>
                </div>

                {/* INLINE ADD / QTY */}
                {inCart ? (
                  <div className="qty-box">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, "dec")}
                    >
                      −
                    </button>
                    <span className="qty-count">{inCart.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, "inc")}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-inline"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ITEM MODAL */}
      {selectedItem && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name}</h2>
            <p>₦{selectedItem.price}</p>

            <div className="addons">
              <h4>Add-ons</h4>
              <label>
                <input type="checkbox" /> Extra Chicken + ₦300
              </label>
              <label>
                <input type="checkbox" /> Cheese + ₦150
              </label>
              <label>
                <input type="checkbox" /> Sauce + ₦100
              </label>
            </div>

            <div className="notes-box">
              <textarea placeholder="Add a note..." />
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

      {/* STICKY CART */}
      {cart.length > 0 && (
        <div
          className="sticky-cart"
          onClick={() => alert("Proceed to checkout")}
        >
          <span>{cart.reduce((acc, i) => acc + i.qty, 0)} items</span>
          <span>₦{total}</span>
        </div>
      )}
    </div>
  );
}
