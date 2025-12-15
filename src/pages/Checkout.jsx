import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";
import "../styles/checkout.css";

export default function Checkout({ cart = [] }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("card");

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  return (
    <div className="co-page">
      {/* HEADER */}
      <div className="co-header">
        <button className="co-back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <h3>Checkout</h3>
      </div>

      {/* DELIVERY INFO */}
      <section className="co-card">
        <div className="co-card-title">
          <FiMapPin /> Delivery Address
        </div>

        <input
          className="co-input"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          className="co-textarea"
          placeholder="Delivery notes (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>

      {/* ETA */}
      <section className="co-card co-inline">
        <FiClock />
        <span>Estimated delivery</span>
        <strong>25 – 35 mins</strong>
      </section>

      {/* PAYMENT */}
      <section className="co-card">
        <div className="co-card-title">
          <FiCreditCard /> Payment Method
        </div>

        <label className={`co-payment ${payment === "card" ? "active" : ""}`}>
          <input
            type="radio"
            checked={payment === "card"}
            onChange={() => setPayment("card")}
          />
          Card
        </label>

        <label className={`co-payment ${payment === "cash" ? "active" : ""}`}>
          <input
            type="radio"
            checked={payment === "cash"}
            onChange={() => setPayment("cash")}
          />
          Cash on Delivery
        </label>
      </section>

      {/* ORDER SUMMARY */}
      <section className="co-card">
        <div className="co-card-title">Order Summary</div>

        {cart.map((item) => (
          <div key={item.id} className="co-summary-row">
            <span>{item.qty} × {item.name}</span>
            <span>₦{item.price * item.qty}</span>
          </div>
        ))}

        <div className="co-divider" />

        <div className="co-summary-row">
          <span>Subtotal</span>
          <span>₦{subtotal}</span>
        </div>

        <div className="co-summary-row">
          <span>Delivery fee</span>
          <span>₦{deliveryFee}</span>
        </div>

        <div className="co-summary-row total">
          <span>Total</span>
          <span>₦{total}</span>
        </div>
      </section>

      {/* CTA */}
      <button
        className="co-pay-btn"
        disabled={!address}
        onClick={() => alert("Order placed successfully")}
      >
        <FiCheckCircle /> Place Order · ₦{total}
      </button>
    </div>
  );
}
