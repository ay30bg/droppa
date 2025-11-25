import React, { useState, useEffect } from "react";
import "../styles/orders.css";
import { FiShoppingCart, FiRepeat, FiEye } from "react-icons/fi";

const mockOrders = [
  {
    id: 1,
    restaurant: "Chicken Republic",
    image: "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220",
    items: ["Fried Chicken", "Coleslaw", "Drink"],
    total: 2500,
    date: "2025-11-20",
    status: "Delivered",
  },
  {
    id: 2,
    restaurant: "Fast Bite",
    image: "https://via.placeholder.com/300x150",
    items: ["Burger", "Fries"],
    total: 1800,
    date: "2025-11-22",
    status: "In Progress",
  },
  {
    id: 3,
    restaurant: "The Place",
    image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220",
    items: ["Rice Meal", "Drink"],
    total: 2200,
    date: "2025-11-21",
    status: "Cancelled",
  },
];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => setOrders(mockOrders), 500); // simulate API fetch
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "#4CAF50";
      case "In Progress": return "#FFC107";
      case "Cancelled": return "#F44336";
      default: return "#777";
    }
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-state">
          <FiShoppingCart size={80} color="#ccc" />
          <h3>No orders yet</h3>
          <p>Looks like you haven’t placed any orders. Explore restaurants and make your first order!</p>
        </div>
      ) : (
        <>
          <h3>Recent Orders</h3>
          <div className="orders-list horizontal-scroll">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <img src={order.image} alt={order.restaurant} className="order-image" />
                <div className="order-details">
                  <h3>{order.restaurant}</h3>
                  <p className="order-items">{order.items.join(", ")}</p>
                  <div className="order-meta">
                    <span className="order-date">{order.date}</span>
                    <span 
                      className="order-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                    <span className="order-total">₦{order.total}</span>
                  </div>
                  <div className="order-actions">
                    <button className="reorder-btn"><FiRepeat /> Reorder</button>
                    <button className="view-btn"><FiEye /> View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
