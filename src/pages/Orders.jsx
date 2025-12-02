import React, { useState } from "react";
import "../styles/orders.css";

// Import your downloaded SVGs as React components
import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as TrackIcon } from "../assets/TrackIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/HistoryIcon.svg";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="order-page">
      
      {/* Sticky Tabs */}
      <div className="order-tabs-wrapper">
        
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

      </div>

      {/* Scrollable Content */}
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
      <CartIcon className="empty-icon" />
      <p>Add some meals and enjoy fast delivery.</p>
      <button>Browse Restaurants</button>
    </div>
  );
}

function EmptyTrack() {
  return (
    <div className="empty-state">
      <TrackIcon className="empty-icon" />
      <p>Place an order and track it in real time.</p>
      <button>Order Now</button>
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="empty-state">
      <HistoryIcon className="empty-icon" />
      <p>You haven't ordered anything yet. Let’s fix that!</p>
      <button>Order Now</button>
    </div>
  );
}




