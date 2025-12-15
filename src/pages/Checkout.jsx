import React, { useState } from "react";
import "../styles/checkout.css";

const sampleCart = [
  { id: 1, name: "Chicken Burger", price: 1500, quantity: 1 },
  { id: 2, name: "Fries", price: 500, quantity: 2 },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState(sampleCart);
  const [step, setStep] = useState(1); // 1 = Order Review, 2 = Payment
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 300;
  const VAT = Math.round(orderTotal * 0.075); // 7.5% VAT
  const totalPayable = orderTotal + deliveryFee + VAT;

  return (
    <div className="checkout-page">
      <div className="checkout-tabs">
        <div className={`tab ${step === 1 ? "active" : ""}`}>1. Order</div>
        <div className={`tab ${step === 2 ? "active" : ""}`}>2. Payment</div>
      </div>

      {step === 1 && (
        <div className="order-step">
          <h2>Review Your Order</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-name">{item.name}</div>
                <div className="item-actions">
                  <button onClick={() => handleQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantity(item.id, 1)}>+</button>
                  <span className="item-price">₦{item.price * item.quantity}</span>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <span>Subtotal:</span>
            <span>₦{orderTotal}</span>
          </div>
          <button className="next-btn" onClick={() => setStep(2)}>Make Payment</button>
        </div>
      )}

      {step === 2 && (
        <div className="payment-step">
          <h2>Delivery & Payment</h2>
          <div className="delivery-address">
            <label>Delivery Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="payment-summary">
            <div><span>Order Total:</span> <span>₦{orderTotal}</span></div>
            <div><span>Delivery Fee:</span> <span>₦{deliveryFee}</span></div>
            <div><span>VAT (7.5%):</span> <span>₦{VAT}</span></div>
            <div className="total"><span>Total:</span> <span>₦{totalPayable}</span></div>
          </div>

          <div className="payment-method">
            <label>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">Card</option>
              <option value="cash">Cash on Delivery</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          <button
            className="place-order-btn"
            disabled={!address}
            onClick={() => alert("Order Placed!")}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
