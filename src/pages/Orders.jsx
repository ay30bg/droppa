import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";

import OrdersHeader from "../components/OrdersHeader";

import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as TrackIcon } from "../assets/TrackIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/HistoryIcon.svg";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="order-page">
      
      {/* ================= HEADER ================= */}
      <OrdersHeader activeTab={activeTab} />

      {/* ================= TABS ================= */}
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

      {/* ================= CONTENT ================= */}
      <div className="order-content">
        {activeTab === "cart" && <EmptyCart />}
        {activeTab === "track" && <EmptyTrack />}
        {activeTab === "history" && <EmptyHistory />}
      </div>
    </div>
  );
}

/* ================= EMPTY STATES ================= */

function EmptyCart() {
  const navigate = useNavigate();

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

function EmptyTrack() {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <TrackIcon className="empty-icon" />
      <p>Place an order and track it in real time.</p>
      <button onClick={() => navigate("/restaurant")}>
        Order Now
      </button>
    </div>
  );
}

function EmptyHistory() {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <HistoryIcon className="empty-icon" />
      <p>You haven't ordered anything yet. Let’s fix that!</p>
      <button onClick={() => navigate("/restaurant")}>
        Order Now
      </button>
    </div>
  );
}
