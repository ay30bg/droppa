import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";
import OrdersHeader from "../components/OrdersHeader";

import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as TrackIcon } from "../assets/TrackIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/HistoryIcon.svg";

import { featuredRestaurants } from "../data/restaurants";
import { AuthContext } from "../context/AuthContext";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("cart");
  const [allCarts, setAllCarts] = useState({});
  const navigate = useNavigate();

  const { user, setRedirectPath } = useContext(AuthContext);

  /* ==========================
      LOGIN GATE
  ===========================*/
  const handleLoginRedirect = () => {
    // Save redirect path so user returns after login
    if (setRedirectPath) {
      setRedirectPath("/orders");
    } else {
      localStorage.setItem("redirect_after_login", "/orders");
    }

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="order-page locked-orders">
        <div className="locked-box">
          <h2>Login Required</h2>
          <p>You need to log in to access My Cart, Track Orders & History.</p>

          <button className="login-btn" onClick={handleLoginRedirect}>
            Login to Continue
          </button>

          <button className="browse-btn" onClick={() => navigate("/restaurant")}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  /* ==========================
      LOAD CARTS WHEN LOGGED IN
  ===========================*/
  useEffect(() => {
    const saved = localStorage.getItem("restaurant_cart");
    const parsed = saved ? JSON.parse(saved) : {};
    setAllCarts(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurant_cart", JSON.stringify(allCarts));
  }, [allCarts]);

  const clearAllCarts = () => setAllCarts({});

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
                  navigate("/checkout", {
                    state: { cart: cartItems, restaurant },
                  })
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

/* ================= EMPTY STATES ================= */

function EmptyTrack({ navigate }) {
  return (
    <div className="empty-state">
      <TrackIcon className="empty-icon" />
      <p>Place an order and track it in real time.</p>
      <button onClick={() => navigate("/restaurant")}>Order Now</button>
    </div>
  );
}

function EmptyHistory({ navigate }) {
  return (
    <div className="empty-state">
      <HistoryIcon className="empty-icon" />
      <p>You haven’t ordered anything yet.</p>
      <button onClick={() => navigate("/restaurant")}>Order Now</button>
    </div>
  );
}
