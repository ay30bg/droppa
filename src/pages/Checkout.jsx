import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

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
        <div className={`ck-step-item ${step === 1 ? "active" : ""}`}>
          <span className="ck-step-label">Order Summary</span>
          <div className={`ck-step-bar ${step === 1 ? "active" : ""}`} />
        </div>

        <div className={`ck-step-item ${step === 2 ? "active" : ""}`}>
          <span className="ck-step-label">Delivery & Payment</span>
          <div className={`ck-step-bar ${step === 2 ? "active" : ""}`} />
        </div>
      </div>

      {/* ================= STEP CONTENT WITH TRANSITION ================= */}
      <div className={`ck-step-content step-${step}`}>
        {step === 1 && (
          <div className="ck-step1">
            <div className="ck-card">
              <div className="ck-restaurant">
                <div>
                  <h4>The Place</h4>
                  <p>Surulere · {cart.length} item(s)</p>
                </div>
                <button className="ck-edit" onClick={() => navigate(-1)}>
                  Edit
                </button>
              </div>

              <div className="ck-divider" />

              {cart.map((item) => (
                <div className="ck-item" key={item.id}>
                  <div className="ck-item-info">
                    <p className="ck-item-name">{item.name}</p>
                    <span className="ck-price">₦{item.price}</span>
                  </div>

                  <div className="ck-qty-box">
                    <button onClick={() => changeQty(item.id, "dec")}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, "inc")}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ck-card ck-row">
              <span>Add note for vendor</span>
              <span className="ck-arrow">›</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ck-step2">
            <div className="ck-card">
              <h4 className="ck-section-title">Delivery details</h4>

              <div className="ck-info-row">
                <span>Delivery address</span>
                <button className="ck-edit">Add</button>
              </div>

              <div className="ck-info-row">
                <span>Contact phone</span>
                <button className="ck-edit">Add</button>
              </div>
            </div>

            <div className="ck-card">
              <h4 className="ck-section-title">Payment summary</h4>

              <div className="ck-summary-row">
                <span>Subtotal</span>
                <span>₦{subtotal}</span>
              </div>

              <div className="ck-summary-row">
                <span>Delivery fee</span>
                <span>₦{deliveryFee}</span>
              </div>

              <div className="ck-divider" />

              <div className="ck-summary-row total">
                <span>Total</span>
                <span>₦{total}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="ck-footer">
        {step === 1 ? (
          <button className="ck-pay" onClick={() => setStep(2)}>
            Continue
          </button>
        ) : (
          <button className="ck-pay">
            Place Order · ₦{total}
          </button>
        )}
      </div>
    </div>
  );
}
