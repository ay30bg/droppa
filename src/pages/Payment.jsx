import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/payment.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {}; // get order from checkout

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
    <div className="payment-page">
      {/* HEADER */}
      <div className="ck-header">
        <div className="ck-header-left">
          <button className="ck-back" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>
          <span className="ck-title">Payment</span>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="payment-card">
        <h4>Order Summary</h4>

        <div className="row">
          <span>Food Total</span>
          <span>₦{order.foodTotal}</span>
        </div>

        <div className="row">
          <span>Delivery Fee</span>
          <span>₦{order.deliveryFee}</span>
        </div>

        <div className="row total">
          <span>Total Payable</span>
          <span>₦{order.total}</span>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="payment-card">
        <h4>Select Payment Method</h4>

        <label className={`payment-option ${method === "card" ? "active" : ""}`}>
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Pay with Card / Bank / USSD
        </label>

        <label className={`payment-option ${method === "transfer" ? "active" : ""}`}>
          <input
            type="radio"
            checked={method === "transfer"}
            onChange={() => setMethod("transfer")}
          />
          Bank Transfer (Manual Verification)
        </label>
      </div>

      {/* PAY BUTTON */}
      <button className="pay-btn" onClick={handlePay}>
        Pay ₦{order.total}
      </button>

      <p className="refund-note">
        Refunds are available before order preparation begins.
      </p>
    </div>
  );
}
