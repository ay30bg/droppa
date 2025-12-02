import React from "react";
import "../styles/welcome.css";
import { FiArrowRight } from "react-icons/fi";
import foodGif from "../assets/Restaurant.gif"; // your GIF file

export default function WelcomePage() {
  return (
    <div className="welcome-page">

      {/* Top Header */}
      <div className="welcome-header">
        <div className="welcome-logo">Droppa</div>
        <button
          className="explore-btn"
          onClick={() => (window.location.href = "/home")}
        >
          Explore Now
        </button>
      </div>

      {/* Middle Content */}
      <div className="welcome-content">
        <div className="welcome-illustration">
          <img src={foodGif} alt="Food Animation" style={{ width: "100%", maxWidth: 400 }} />
        </div>
        <h1 className="welcome-title">Delicious Food, Fast Delivery</h1>
        <p className="welcome-subtitle">
          Order meals from your favorite restaurants near you.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="welcome-bottom">
        <button
          className="welcome-btn primary"
          onClick={() => (window.location.href = "/register")}
        >
          Get Started <FiArrowRight />
        </button>
        <p className="welcome-login-text">
          Already have an account?{" "}
          <span
            className="login-link"
            onClick={() => (window.location.href = "/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
