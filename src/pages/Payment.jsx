import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/payment.css"; 

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  const [method, setMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!order) return <p>No order found.</p>;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "SAVE50") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (method === "transfer") {
        navigate("/bank-transfer", { state: { order } });
      } else {
        navigate("/process-payment", { state: { order, method } });
      }
    }, 1000);
  };

  const totalPayable = order.total - discount;

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

        {order.items?.map((item) => (
          <div className="payment-item-row" key={item.id}>
            <span>{item.name} x {item.qty}</span>
            <span>₦{item.price * item.qty}</span>
          </div>
        ))}

        <div className="payment-summary-row">
          <span>Food Total</span>
          <span>₦{order.foodTotal}</span>
        </div>

        <div className="payment-summary-row">
          <span>Delivery Fee</span>
          <span>₦{order.deliveryFee}</span>
        </div>

        <div className="payment-summary-row">
          <span>Discount</span>
          <span>₦{discount}</span>
        </div>

        <div className="payment-summary-row total">
          <span>Total Payable</span>
          <span>₦{totalPayable}</span>
        </div>

        {/* Estimated Delivery */}
        <div className="payment-estimate">
          Estimated delivery: 30-45 mins
        </div>
      </div>

      {/* PROMO CODE */}
      <div className="payment-card">
        <h4 className="payment-section-title">Apply Promo Code</h4>
        <div className="promo-row">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="promo-input"
          />
          <button className="promo-apply-btn" onClick={handleApplyPromo}>
            Apply
          </button>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="payment-card">
        <h4 className="payment-section-title">Select Payment Method</h4>

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

      {/* FOOTER */}
      <div className="payment-footer">
        <button className="payment-pay-btn" onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : `Pay ₦${totalPayable}`}
        </button>
        <p className="payment-refund-note">
          Refunds are available before order preparation begins.
        </p>
      </div>
    </div>
  );
}
