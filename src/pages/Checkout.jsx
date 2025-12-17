import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Asun Pepper Rice + Maltina",
      price: 5750,
      qty: 1,
    },
  ]);

  const changeQty = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: type === "inc" ? item.qty + 1 : item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="ck-page">
      {/* ================= HEADER ================= */}
      <div className="ck-header">
        <div className="ck-header-left">
          <button className="ck-back" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>
          <span className="ck-title">Checkout</span>
        </div>
      </div>

      {/* ================= STEPS ================= */}
      <div className="ck-steps">
        <div className="ck-step active" />
        <div className="ck-step" />
      </div>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="ck-card">
        <div className="ck-restaurant">
          <div>
            <h4>The Place</h4>
            <p>Surulere · {cart.length} item(s)</p>
          </div>
          <button className="ck-edit">Edit</button>
        </div>

        <div className="ck-divider" />

        {cart.map((item) => (
          <div className="ck-item" key={item.id}>
            <div className="ck-item-info">
              <p className="ck-item-name">{item.name}</p>
              <span className="ck-price">₦{item.price}</span>
            </div>

            <div className="ck-qty-box">
              <button onClick={() => changeQty(item.id, "dec")}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => changeQty(item.id, "inc")}>+</button>
            </div>
          </div>
        ))}

        <button className="ck-add-more">Add another item</button>
      </div>

      {/* ================= NOTE ================= */}
      <div className="ck-card ck-row">
        <span>Add note for vendor</span>
        <span className="ck-arrow">›</span>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="ck-footer">
        <button className="ck-pay">
          Continue · ₦{total}
        </button>
      </div>
    </div>
  );
}
