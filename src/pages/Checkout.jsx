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

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [note, setNote] = useState("");

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
  const vat = subtotal * 0.075;
  const total = subtotal + deliveryFee + vat;

  const canPlaceOrder = cart.length > 0;

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

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <>
          <div className="ck-card">
            <div className="ck-restaurant">
              <div>
                <h4>The Place</h4>
                <p>Surulere · {cart.length} item(s)</p>
                <p className="ck-eta">Delivery in 25–35 mins</p>
              </div>
              <button className="ck-edit" onClick={() => navigate(-1)}>
                Edit
              </button>
            </div>

            <div className="ck-divider" />

            {cart.length === 0 ? (
              <div className="ck-empty">
                <p>Your cart is empty</p>
                <button onClick={() => navigate(-1)}>Add items</button>
              </div>
            ) : (
              cart.map((item) => (
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
              ))
            )}
          </div>

          <div className="ck-card">
            <textarea
              className="ck-note"
              placeholder="Add note for vendor (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <>
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
            <h4 className="ck-section-title">Payment method</h4>

            <label className="ck-radio">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card
            </label>

            <label className="ck-radio">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "transfer"}
                onChange={() => setPaymentMethod("transfer")}
              />
              Bank Transfer
            </label>
          </div>

          <div className="ck-card">
            <h4 className="ck-section-title">Payment summary</h4>

            <div className="ck-summary-row">
              <span>Subtotal</span>
              <span>₦{subtotal.toFixed(0)}</span>
            </div>

            <div className="ck-summary-row">
              <span>Delivery fee</span>
              <span>₦{deliveryFee}</span>
            </div>

            <div className="ck-summary-row">
              <span>VAT (7.5%)</span>
              <span>₦{vat.toFixed(0)}</span>
            </div>

            <div className="ck-divider" />

            <div className="ck-summary-row total">
              <span>Total</span>
              <span>₦{total.toFixed(0)}</span>
            </div>
          </div>
        </>
      )}

      {/* ================= FOOTER ================= */}
      <div className="ck-footer">
        {step === 1 ? (
          <button
            className="ck-pay"
            disabled={!cart.length}
            onClick={() => setStep(2)}
          >
            Continue · ₦{total.toFixed(0)}
          </button>
        ) : (
          <>
            <button className="ck-pay" disabled={!canPlaceOrder}>
              Place Order · ₦{total.toFixed(0)}
            </button>
            <p className="ck-secure">🔒 Payments are secure and encrypted</p>
          </>
        )}
      </div>
    </div>
  );
}
