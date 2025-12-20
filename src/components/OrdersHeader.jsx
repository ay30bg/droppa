import React from "react";
import "../styles/orders.css";
import "../styles/header.css";

export default function OrdersHeader({ activeTab, setActiveTab, hasCartItems }) {
  const getTitle = () => {
    if (activeTab === "cart") return "My Cart";
    if (activeTab === "track") return "Track Order";
    if (activeTab === "history") return "Order History";
    return "Orders";
  };

  return (
    <header className="droppa-header droppa-header--orders droppa-header--with-tabs">
      <div className="orders-header-top">
        <span className="orders-title">{getTitle()}</span>
      </div>

      <div className="order-tabs-wrapper header-tabs">
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
    </header>
  );
}
