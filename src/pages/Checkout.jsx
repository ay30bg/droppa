import { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const [qty, setQty] = useState(1);

  return (
    <div className="dr-root">
      {/* Header */}
      <header className="dr-header">
        <button className="dr-back">←</button>
        <h2>Checkout</h2>
      </header>

      {/* Step Indicator */}
      <div className="dr-steps">
        <div className="dr-step active" />
        <div className="dr-step" />
      </div>

      {/* Order Summary */}
      <section className="dr-card">
        <div className="dr-merchant">
          <div>
            <h4>The Place</h4>
            <p>Surulere · 2 items</p>
          </div>
          <button className="dr-text-btn">Edit</button>
        </div>

        <div className="dr-divider" />

        <div className="dr-item">
          <div>
            <p className="dr-item-name">
              Asun Pepper Rice + Maltina / Amstel Malt
            </p>
            <span className="dr-price">₦5,750</span>
          </div>

          <div className="dr-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        <div className="dr-addon">
          <span>Nylon</span>
          <span>₦100</span>
        </div>

        <button className="dr-outline">Add another item</button>
      </section>

      {/* Note */}
      <section className="dr-card dr-row">
        <span>Add note for vendor</span>
        <span className="dr-arrow">›</span>
      </section>

      {/* Footer */}
      <footer className="dr-footer">
        <button className="dr-primary">Continue</button>
      </footer>
    </div>
  );
}
