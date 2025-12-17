import React, { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const [qty, setQty] = useState(1);
  const [extraPackaging, setExtraPackaging] = useState(false);

  return (
    <div className="dp-page">
      {/* Header */}
      <header className="dp-header">
        <button className="dp-back">←</button>
        <h2>Checkout</h2>
      </header>

      {/* Progress */}
      <div className="dp-progress">
        <div className="dp-bar active" />
        <div className="dp-bar" />
      </div>

      {/* Order Card */}
      <section className="dp-card">
        <div className="dp-card-head">
          <div>
            <h4>The Place — Surulere</h4>
            <span>2 items</span>
          </div>
          <button className="dp-link">Edit</button>
        </div>

        {/* Item */}
        <div className="dp-item">
          <div className="dp-item-info">
            <p className="dp-item-name">
              Asun Pepper Rice + Maltina / Amstel Malt
            </p>
            <span className="dp-price">₦5,750</span>
          </div>

          <div className="dp-qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        <div className="dp-addon">
          <span>Nylon</span>
          <span>₦100</span>
        </div>

        <button className="dp-secondary">+ Add another item</button>
      </section>

      {/* Notes */}
      <section className="dp-card dp-row">
        <span>Add a note</span>
        <span className="dp-arrow">›</span>
      </section>

      {/* Packaging */}
      <section className="dp-card dp-row">
        <div>
          <h5>Extra packaging</h5>
          <p>Protect your order during delivery</p>
        </div>
        <input
          type="checkbox"
          checked={extraPackaging}
          onChange={() => setExtraPackaging(!extraPackaging)}
        />
      </section>

      {/* CTA */}
      <footer className="dp-footer">
        <button className="dp-primary">Continue</button>
      </footer>
    </div>
  );
}
