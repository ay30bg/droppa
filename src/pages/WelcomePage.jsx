import React from "react";
import "../styles/welcome.css";
import { FiArrowRight } from "react-icons/fi";
import foodImage from "../assets/foodPicture.jpeg"; 

export default function WelcomePage() {
  return (
    <div className="welcome-page">

      {/* Top Image */}
      <div className="welcome-image-container">
        <img src={foodImage} alt="Food" className="welcome-image" />
      </div>

      {/* Droppa Logo */}
      <div className="welcome-logo">Droppa</div>
      <h4>Delicious Food, Fast Delivery</h4>
<p>Order meals from your favorite restaurants near you</p>
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
