import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/payment.css"; // make sure this points to your CSS

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  
  const [method, setMethod] = useState("card");

  const handlePay = () => {
    if (method === "transfer") {
      navigate("/bank-transfer", { state: { order } });
    } else {
      navigate("/process-payment", { state: { order, method } });
    }
  };

  if (!order) return <p>No order found.</p>;

  return (
    <div className="payment-page-container">
      {/* HEADER */}
      <div className="payment-header">
        <button className="payment-back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <span className="payment-title">Payment</span>
      </div>

      {/* ORDER SUMMARY */}
      <div className="payment-card">
        <h4 className="payment-section-title">Order Summary</h4>

        <div className="payment-summary-row">
          <span>Food Total</span>
          <span>₦{order.foodTotal}</span>
        </div>

        <div className="payment-summary-row">
          <span>Delivery Fee</span>
          <span>₦{order.deliveryFee}</span>
        </div>

        <div className="payment-summary-row total">
          <span>Total Payable</span>
          <span>₦{order.total}</span>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="payment-card">
        <h4 className="payment-section-title">Select Payment Method</h4>

        <label
          className={`payment-option ${method === "card" ? "active" : ""}`}
        >
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Pay with Card / Bank / USSD
        </label>

        <label
          className={`payment-option ${method === "transfer" ? "active" : ""}`}
        >
          <input
            type="radio"
            checked={method === "transfer"}
            onChange={() => setMethod("transfer")}
          />
          Bank Transfer (Manual Verification)
        </label>
      </div>

      {/* FOOTER */}
      <div className="payment-footer">
        <button className="payment-pay-btn" onClick={handlePay}>
          Pay ₦{order.total}
        </button>
        <p className="payment-refund-note">
          Refunds are available before order preparation begins.
        </p>
      </div>
    </div>
  );
}
