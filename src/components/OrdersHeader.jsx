import React from "react";
import "../styles/header.css";

export default function OrdersHeader({ activeTab }) {
  const getTitle = () => {
    if (activeTab === "cart") return "My Cart";
    if (activeTab === "track") return "Track Order";
    if (activeTab === "history") return "Order History";
    return "Orders";
  };

  return (
    <header className="droppa-header droppa-header--orders">
      <span className="orders-title">{getTitle()}</span>
    </header>
  );
}
