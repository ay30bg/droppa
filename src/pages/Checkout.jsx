import { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const [qty, setQty] = useState(1);

  return (
    <div className="dp-root">
      {/* Header */}
      <header className="dp-header">
        <button className="dp-back">←</button>
        <h1>Checkout</h1>
      </header>

      {/* Progress */}
      <div className="dp-progress">
        <span className="active" />
        <span />
      </div>

      {/* Order Card */}
      <section className="dp-card">
        <div className="dp-merchant">
          <div>
            <h4>The Place</h4>
            <p>Surulere • 2 items</p>
          </div>
          <button className="dp-edit">Edit</button>
        </div>

        <div className="dp-divider" />

        <div className="dp-item">
          <div className="dp-item-info">
            <p className="dp-item-title">
              Asun Pepper Rice + Maltina / Amstel Malt
            </p>
            <span className="dp-item-price">₦5,750</span>
          </div>

          <div className="dp-counter">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
        </div>

        <div className="dp-addon">
          <span>Nylon</span>
          <span>₦100</span>
        </div>

        <button className="dp-outline">Add another item</button>
      </section>

      {/* Notes */}
      <section className="dp-card dp-row">
        <span>Add delivery note</span>
        <span className="dp-chevron">›</span>
      </section>

      {/* Footer */}
      <footer className="dp-footer">
        <button className="dp-primary">Continue</button>
      </footer>
    </div>
  );
}
