import React, { useState } from "react";
import "../styles/checkout.css";

const sampleCart = [
  { id: 1, name: "Chicken Burger", price: 1500, quantity: 1 },
  { id: 2, name: "Fries", price: 500, quantity: 2 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState(sampleCart);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = 300;
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + deliveryFee + vat;

  return (
    <div className="checkout-page">
      {/* Tabs */}
      <div className="checkout-tabs">
        <button className={step === 1 ? "active" : ""}>Order</button>
        <button className={step === 2 ? "active" : ""}>Payment</button>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="checkout-card">
          <h3>Your Order</h3>

          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-price">₦{item.price}</p>
              </div>

              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>

              <button className="remove" onClick={() => removeItem(item.id)}>
                ✕
              </button>
            </div>
          ))}

          <div className="summary">
            <div>
              <span>Subtotal</span>
              <span>₦{subtotal}</span>
            </div>
          </div>

          <button className="primary-btn" onClick={() => setStep(2)}>
            Make Payment • ₦{subtotal}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="checkout-card">
          <h3>Delivery & Payment</h3>

          <div className="field">
            <label>Delivery Address</label>
            <input
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="summary">
            <div><span>Subtotal</span><span>₦{subtotal}</span></div>
            <div><span>Delivery</span><span>₦{deliveryFee}</span></div>
            <div><span>VAT</span><span>₦{vat}</span></div>
            <div className="total"><span>Total</span><span>₦{total}</span></div>
          </div>

          <div className="field">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Card</option>
              <option value="wallet">Wallet</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          <button
            className="primary-btn"
            disabled={!address}
            onClick={() => alert("Order Placed")}
          >
            Place Order • ₦{total}
          </button>
        </div>
      )}
    </div>
  );
}
