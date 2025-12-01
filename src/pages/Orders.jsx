import React, { useState } from "react";
import "../styles/orders.css";

// Icons
import { FiShoppingBag, FiTruck, FiClock } from "react-icons/fi";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="order-page">
      {/* Tabs */}
      <div className="order-tabs">
        <div
          className={`order-tab ${activeTab === "cart" ? "active" : ""}`}
          onClick={() => setActiveTab("cart")}
        >
          My Cart
        </div>

        <div
          className={`order-tab ${activeTab === "track" ? "active" : ""}`}
          onClick={() => setActiveTab("track")}
        >
          Track Order
        </div>

        <div
          className={`order-tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          History
        </div>
      </div>

      {/* Content */}
      <div className="order-content">
        {activeTab === "cart" && <EmptyCart />}
        {activeTab === "track" && <EmptyTrack />}
        {activeTab === "history" && <EmptyHistory />}
      </div>
    </div>
  );
}

/* ---------------- EMPTY STATES ---------------- */

function EmptyCart() {
  return (
    <div className="empty-state">
      <FiShoppingBag size={90} className="empty-icon" />
      <h2>Your cart is empty</h2>
      <p>Add some meals and enjoy delicious food delivered fast.</p>
      <button>Browse Restaurants</button>
    </div>
  );
}

function EmptyTrack() {
  return (
    <div className="empty-state">
      <FiTruck size={90} className="empty-icon" />
      <h2>No Active Orders</h2>
      <p>When you place an order, you’ll be able to track it in real-time.</p>
      <button>Order Now</button>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="empty-state">
      <FiClock size={90} className="empty-icon" />
      <h2>No Order History</h2>
      <p>You haven't ordered anything yet. Let’s fix that!</p>
      <button>Order Now</button>
    </div>
  );
}

