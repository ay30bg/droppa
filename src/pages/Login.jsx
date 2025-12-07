import React from "react";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
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
        />
      </div>

      {/* Button */}
      <button className="lp-btn">
        Continue <FiArrowRight className="lp-arrow" />
      </button>

    </div>
  );
}
