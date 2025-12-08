import React, { useState } from "react";
import "../styles/getstarted.css";

export default function GetStarted() {

  return (
    <div className="gs-container">
      <h1 className="gs-title">Create Your Account</h1>
      <p className="gs-subtitle">Let's get you started with Droppa</p>

      {/* Full Name */}
      <div className="gs-input-group">
        <label className="gs-label">Full Name</label>
        <input
          type="text"
          className="gs-input"
          placeholder="Enter your full name"
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

      {/* Phone Number */}
      <div className="gs-input-group">
        <label className="gs-label">Phone Number</label>
        <input
          type="tel"
          className="gs-input"
          placeholder="080..."
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
          placeholder="Enter code"
        />
      </div>

      {/* Signup Button */}
      <button className="gs-btn">Sign Up</button>

      {/* Terms */}
      <p className="gs-terms">
        By signing up, you agree with Droppa’s policy.
      </p>
    </div>
  );
}
