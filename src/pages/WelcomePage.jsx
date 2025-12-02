import React from "react";
import "../styles/welcome.css";
import { FiArrowRight } from "react-icons/fi";

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      {/* Illustration */}
      <div className="welcome-illustration">
        <img
          src="https://cdn.jsdelivr.net/gh/akabab/small-assets/food-delivery-illustration.png"
          alt="Food Delivery Illustration"
        />
      </div>

      {/* Content */}
      <h1 className="welcome-title">Delicious Food, Fast Delivery</h1>
      <p className="welcome-subtitle">
        Order meals from your favorite restaurants near you.
      </p>

      {/* Buttons */}
      <div className="welcome-buttons">
        <button
          className="welcome-btn primary"
          onClick={() => (window.location.href = "/login")}
        >
          Get Started <FiArrowRight />
        </button>

        <button
          className="welcome-btn outline"
          onClick={() => (window.location.href = "/register")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
