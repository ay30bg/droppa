import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; 
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registeredPhones = ["08123456789", "09034951446"];

  const handleCheckPhone = () => {
    setError("");

    if (phone.length !== 11) return;

    setLoading(true);
    setTimeout(() => {
      if (registeredPhones.includes(phone)) {
        navigate("/verify", { state: { phone } });
      } else {
        setError("Phone number is not registered");
      }
      setLoading(false);
    }, 1000);
  };

  // 🔥 Auto-trigger when phone becomes 11 digits
  useEffect(() => {
    if (phone.length === 11) {
      handleCheckPhone();
    }
  }, [phone]);

  return (
    <div className="lp-container">
      <h1 className="lp-greeting">Welcome Back</h1>
      <p className="lp-subtext">Enter your phone number to continue</p>

      <div className="lp-input-group">
        <label className="lp-label">Phone Number</label>
        <input
          type="tel"
          className="lp-input"
          placeholder="e.g. 08123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {error && <p className="lp-error">{error}</p>}

      <button
        className="lp-btn"
        onClick={handleCheckPhone}
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            Continue <FiArrowRight className="lp-arrow" />
          </>
        )}
      </button>

      <p className="lp-bottom-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/get-started")}>Get Started</span>
      </p>
    </div>
  );
}
