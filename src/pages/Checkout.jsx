import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const locationState = useLocation();

  const { cart: initialCart = [], restaurant } = locationState.state || {};

  const [cart, setCart] = useState(initialCart);

  // 🔹 Load saved delivery address
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const savedAddress = localStorage.getItem("droppa_user_location");
    if (savedAddress) {
      setDeliveryAddress(savedAddress);
    }
  }, []);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 1200;
  const vat = subtotal * 0.075;
  const total = subtotal + deliveryFee + vat;

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <FiArrowLeft size={22} onClick={() => navigate(-1)} />
        <h3>Checkout</h3>
      </div>

      {/* Delivery Address Box */}
      <div className="checkout-section">
        <h4>Delivery Address</h4>

        <div
          className="delivery-address-box"
          onClick={() => navigate("/location")} // optional: allow editing
        >
          {deliveryAddress ? (
            <p>{deliveryAddress}</p>
          ) : (
            <p className="placeholder-text">Select delivery address</p>
          )}
        </div>
      </div>

      {/* Restaurant Info */}
      {restaurant && (
        <div className="checkout-section">
          <h4>Order From</h4>
          <div className="restaurant-box">
            <p>{restaurant.name}</p>
          </div>
        </div>
      )}

      {/* Cart Items */}
      <div className="checkout-section">
        <h4>Order Summary</h4>

        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <div>
              <p className="item-name">{item.name}</p>
              <small>x {item.quantity}</small>
            </div>

            <p className="item-price">
              ₦{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="checkout-section totals-box">
        <div className="total-row">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>

        <div className="total-row">
          <span>VAT (7.5%)</span>
          <span>₦{vat.toLocaleString()}</span>
        </div>

        <div className="total-row">
          <span>Delivery Fee</span>
          <span>₦{deliveryFee.toLocaleString()}</span>
        </div>

        <hr />

        <div className="total-row grand-total">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className="place-order-btn"
        disabled={!deliveryAddress}
      >
        Place Order
      </button>
    </div>
  );
}
