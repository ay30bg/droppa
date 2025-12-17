import React, { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const [bag, setBag] = useState(false);

  return (
    <div className="ck-page">
      {/* Header */}
      <div className="ck-header">
        <span className="ck-back">←</span>
        <h3>Checkout</h3>
      </div>

      {/* Steps */}
      <div className="ck-steps">
        <div className="ck-step active">Your Order</div>
        <div className="ck-step">Delivery & Payment</div>
      </div>

      {/* Order Summary */}
      <div className="ck-section">
        <h4>Order Summary</h4>

        <div className="ck-restaurant">
          <div>
            <h5>The Place – Surulere</h5>
            <p>2 Items</p>
          </div>
          <span className="ck-hide">Hide Selection</span>
        </div>

        {/* Pack */}
        <div className="ck-pack">
          <div className="ck-pack-header">
            <h5>Pack 1</h5>
            <button className="ck-add-pack">+ Add to this pack</button>
          </div>

          <div className="ck-item">
            <div>
              <p className="ck-item-name">
                ✦ Asun Pepper Rice + Maltina/Amstel Malt
              </p>
              <p className="ck-price">₦5,750</p>
            </div>

            <div className="ck-qty">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="ck-item muted">
            <p>✦ Nylon</p>
            <p>₦100</p>
          </div>

          <button className="ck-add-another">+ Add Another Pack</button>
        </div>
      </div>

      {/* Message */}
      <div className="ck-row">
        <span>Leave a message for the restaurant</span>
        <span>›</span>
      </div>

      {/* Brown bag */}
      <div className="ck-row">
        <div>
          <p className="bold">Need a Chowdeck brown bag?</p>
          <p className="muted">Package your order for just ₦200</p>
        </div>
        <input
          type="checkbox"
          checked={bag}
          onChange={() => setBag(!bag)}
        />
      </div>

      {/* Footer */}
      <div className="ck-footer">
        <p className="terms">
          By proceeding, you agree to our <span>Terms of Use</span> and{" "}
          <span>Privacy Policy</span>
        </p>
        <button className="ck-pay">Make Payment</button>
      </div>
    </div>
  );
}
