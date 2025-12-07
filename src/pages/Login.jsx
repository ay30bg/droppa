import React from "react";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="login-container">
      
      {/* Greeting */}
      <h1 className="login-greeting">Welcome Back 👋</h1>
      <p className="login-subtext">Enter your phone number to continue</p>

      {/* Phone Input */}
      <div className="login-input-group">
        <label className="login-label">Phone Number</label>
        <input 
          type="tel"
          className="login-input"
          placeholder="e.g. 08123456789"
        />
      </div>

      {/* Button */}
      <button className="login-btn">
        Continue <FiArrowRight className="arrow" />
      </button>

    </div>
  );
}
