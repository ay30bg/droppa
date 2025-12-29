import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";
import OrdersHeader from "../components/OrdersHeader";

import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as TrackIcon } from "../assets/TrackIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/HistoryIcon.svg";

import { featuredRestaurants } from "../data/restaurants";
import { useAuth } from "../context/AuthContext";

export default function OrderPage() {
  const { isLoggedIn, setRedirectPath } = useAuth();
  const [activeTab, setActiveTab] = useState("cart");
  const [allCarts, setAllCarts] = useState({});
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  /* ===========================
       Load carts safely
  ============================ */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("restaurant_cart");
      const parsed = saved ? JSON.parse(saved) : {};
      setAllCarts(parsed);
    } catch (e) {
      console.error("Failed to load cart:", e);
      setHasError(true);
    }
  }, []);

  // persist carts safely
  useEffect(() => {
    try {
      localStorage.setItem("restaurant_cart", JSON.stringify(allCarts));
    } catch (e) {
      console.error("Failed to save cart:", e);
      setHasError(true);
    }
  }, [allCarts]);

  const clearAllCarts = () => setAllCarts({});

  /* ===========================
       Handle Login Required
  ============================ */
  if (!isLoggedIn) {
    try {
      setRedirectPath("/orders");
    } catch (e) {
      console.error("Failed to set redirectPath:", e);
    }

    return (
      <div className="order-page">
        <div className="empty-state">
          <CartIcon className="empty-icon" />
          <h3>You’re not logged in</h3>
          <p>Login to view My Cart, Track Orders and Order History.</p>
          <button onClick={() => navigate("/login")}>
            Login to Continue
          </button>
          <button onClick={() => navigate("/restaurant")}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
       Friendly Error State
  ============================ */
  if (hasError) {
    return (
      <div className="order-page">
        <div className="empty-state">
          <CartIcon className="empty-icon" />
          <h3>Oops! Something went wrong.</h3>
          <p>We couldn’t load your cart. Please refresh or try again later.</p>
          <button onClick={() => navigate("/restaurant")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
       Normal Logged-In Experience
  ============================ */
  return (
    <div className="order-page">
      <OrdersHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasCartItems={Object.keys(allCarts).length > 0}
        onClearCart={clearAllCarts}
      />

      <div className="order-content">
        {activeTab === "cart" && (
          <CartTab
            allCarts={allCarts}
            setAllCarts={setAllCarts}
            navigate={navigate}
          />
        )}
        {activeTab === "track" && <EmptyTrack navigate={navigate} />}
        {activeTab === "history" && <EmptyHistory navigate={navigate} />}
      </div>
    </div>
  );
}

/* ================= CART TAB ================= */
function CartTab({ allCarts, setAllCarts, navigate }) {
  const restaurantIds = Object.keys(allCarts).filter(
    (rid) => allCarts[rid] && allCarts[rid].length > 0
  );

  if (!restaurantIds.length) {
    return (
      <div className="empty-state">
        <CartIcon className="empty-icon" />
        <p>Add some meals and enjoy fast delivery.</p>
        <button onClick={() => navigate("/restaurant")}>
          Browse Restaurants
        </button>
      </div>
    );
  }

  const changeQty = (restaurantId, itemId, type) => {
    setAllCarts((prev) => {
      const updatedItems = prev[restaurantId]
        .map((item) =>
          item.id === itemId
            ? { ...item, qty: type === "inc" ? item.qty + 1 : item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

      const updated = { ...prev, [restaurantId]: updatedItems };
      if (!updatedItems.length) delete updated[restaurantId];
      return updated;
    });
  };

  const removeRestaurantCart = (restaurantId) => {
    setAllCarts((prev) => {
      const updated = { ...prev };
      delete updated[restaurantId];
      return updated;
    });
  };

  return (
    <div className="cart-tab-wrapper">
      {restaurantIds.map((rid) => {
        const restaurant = featuredRestaurants.find(
          (r) => r.id === Number(rid)
        );

        const cartItems = allCarts[rid];
        const subtotal = cartItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        );
        const deliveryFee = 200;
        const total = subtotal + deliveryFee;

        return (
          <div key={rid} className="restaurant-cart polished">
            <div className="restaurant-cart-header">
              <h3 className="restaurant-name">
                {restaurant?.name || `Restaurant ${rid}`}
              </h3>
              <button
                className="cart-close-btn"
                onClick={() => removeRestaurantCart(rid)}
              >
                ×
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-polished">
                  <span className="item-name">{item.name}</span>
                  <div className="item-qty">
                    <button onClick={() => changeQty(rid, item.id, "dec")}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(rid, item.id, "inc")}>
                      +
                    </button>
                  </div>
                  <span className="item-total">₦{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal:</span>
                <span>₦{subtotal}</span>
              </div>
              <div>
                <span>Delivery Fee:</span>
                <span>₦{deliveryFee}</span>
              </div>
              <div className="cart-total-polished">
                <strong>Total:</strong>
                <strong>₦{total}</strong>
              </div>
            </div>

            <div className="cart-checkout-bar">
              <button
                onClick={() =>
                  navigate("/checkout", { state: { cart: cartItems, restaurant } })
                }
              >
                Checkout
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================= EMPTY TRACK ================= */
function EmptyTrack({ navigate }) {
  return (
    <div className="empty-state">
      <TrackIcon className="empty-icon" />
      <p>Place an order and track it in real time.</p>
      <button onClick={() => navigate("/restaurant")}>Order Now</button>
    </div>
  );
}

/* ================= EMPTY HISTORY ================= */
function EmptyHistory({ navigate }) {
  return (
    <div className="empty-state">
      <HistoryIcon className="empty-icon" />
      <p>You haven't ordered anything yet.</p>
      <button onClick={() => navigate("/restaurant")}>Order Now</button>
    </div>
  );
}
