import React, { useState } from "react";
import { FiArrowLeft, FiPlus, FiMinus, FiMapPin, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import "../styles/checkout.css";

export default function Checkout() {
  const [activeTab, setActiveTab] = useState("order");
  const [cart, setCart] = useState([
    { id: 1, name: "Burger", price: 1200, qty: 2, note: "" },
    { id: 2, name: "Fries", price: 500, qty: 1, note: "" },
  ]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const updateNote = (id, value) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, note: value } : i))
    );
  };

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const deliveryFee = 200;
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + deliveryFee + vat;

  return (
    <div className="co-page">
      {/* HEADER */}
      <div className="co-header">
        <div className="co-header-left">
          <button className="co-back" onClick={() => alert("Go back")}>
            <FiArrowLeft size={20} />
          </button>
          <span className="co-title">Checkout</span>
        </div>
      </div>

      {/* TABS */}
      <div className="co-tabs">
        <button
          className={activeTab === "order" ? "active" : ""}
          onClick={() => setActiveTab("order")}
        >
          Your Order
        </button>
        <button
          className={activeTab === "payment" ? "active" : ""}
          disabled={cart.length === 0}
          onClick={() => setActiveTab("payment")}
        >
          Delivery & Payment
        </button>
      </div>

      {/* ================= TAB 1: YOUR ORDER ================= */}
      {activeTab === "order" && (
        <>
          <section className="co-section">
            {cart.map((item) => (
              <div key={item.id} className="co-order-item">
                <div className="co-item-details">
                  <h4>{item.name}</h4>
                  <p>₦{item.price}</p>
                  <input
                    className="co-note"
                    placeholder="Add note (optional)"
                    value={item.note}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                  />
                </div>
                <div className="co-qty-box">
                  <button onClick={() => decreaseQty(item.id)}>
                    <FiMinus />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>
                    <FiPlus />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* SUMMARY */}
          <section className="co-card">
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
              <span>₦{subtotal + deliveryFee}</span>
            </div>
          </section>

          {/* CTA */}
          <div className="co-cart-bar">
            <button
              className="co-pay-btn"
              disabled={cart.length === 0}
              onClick={() => setActiveTab("payment")}
            >
              Make Payment · ₦{subtotal + deliveryFee}
            </button>
          </div>
        </>
      )}

      {/* ================= TAB 2: DELIVERY & PAYMENT ================= */}
      {activeTab === "payment" && (
        <>
          {/* ADDRESS */}
          <section className="co-card">
            <div className="co-card-title">
              <FiMapPin /> Delivery address
            </div>
            <input
              className="co-input"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </section>

          {/* PAYMENT SUMMARY */}
          <section className="co-card">
            <div className="co-card-title">Payment Summary</div>
            <div className="co-summary-row">
              <span>Order total</span>
              <span>₦{subtotal}</span>
            </div>
            <div className="co-summary-row">
              <span>Delivery fee</span>
              <span>₦{deliveryFee}</span>
            </div>
            <div className="co-summary-row">
              <span>VAT (7.5%)</span>
              <span>₦{vat}</span>
            </div>
            <div className="co-summary-row total">
              <span>Total</span>
              <span>₦{total}</span>
            </div>
          </section>

          {/* PAYMENT METHOD */}
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

          {/* PLACE ORDER */}
          <div className="co-cart-bar">
            <button
              className="co-pay-btn"
              disabled={!address}
              onClick={() => alert("Order placed successfully")}
            >
              <FiCheckCircle /> Place Order · ₦{total}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
