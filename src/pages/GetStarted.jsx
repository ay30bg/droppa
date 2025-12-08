import React from "react";
import "../styles/getStarted.css";
import { FiArrowRight } from "react-icons/fi";

export default function GetStarted() {
  return (
    <div className="gs-container">

      {/* Greeting */}
      <h1 className="gs-greeting">Create Account</h1>
      <p className="gs-subtext">Fill your details to get started</p>

      {/* Full Name */}
      <div className="gs-input-group">
        <label className="gs-label">Full Name</label>
        <input 
          type="text"
          className="gs-input"
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div className="gs-input-group">
        <label className="gs-label">Email Address</label>
        <input 
          type="email"
          className="gs-input"
          placeholder="example@mail.com"
        />
      </div>

      {/* Phone */}
      <div className="gs-input-group">
        <label className="gs-label">Phone Number</label>
        <input 
          type="tel"
          className="gs-input"
          placeholder="08123456789"
        />
      </div>

      {/* Birthday */}
      <div className="gs-input-group">
        <label className="gs-label">Birthday</label>
        <input 
          type="date"
          className="gs-input"
        />
      </div>

      {/* Referral Code */}
      <div className="gs-input-group">
        <label className="gs-label">Referral Code (Optional)</label>
        <input 
          type="text"
          className="gs-input"
          placeholder="Enter referral code"
        />
      </div>

      {/* Button */}
      <button className="gs-btn">
        Sign Up <FiArrowRight className="gs-arrow" />
      </button>

      <p className="gs-policy">
        By signing up, you agree with Droppa’s Term of use.
      </p>
    </div>
  );
}
