import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }
    navigate("/verify", { state: { phone } });
  };

  return (
    <div className="lp-container">

      {/* Greeting */}
      <h1 className="lp-greeting">Welcome Back</h1>
      <p className="lp-subtext">Enter your phone number to continue</p>

      {/* Phone Input */}
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

      {/* Continue Button */}
      <button className="lp-btn" onClick={handleContinue}>
        Continue <FiArrowRight className="lp-arrow" />
      </button>

      {/* Bottom Signup Link */}
      <p className="lp-bottom-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/get-started")}>Sign up</span>
      </p>

    </div>
  );
}
