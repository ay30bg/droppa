import React from "react";
import "../styles/welcome.css";
import welcomeImage from "../assets/welcomeImage.jpeg";
import { FiArrowRight } from "react-icons/fi";

export default function WelcomePage() {
  return (
    <div className="welcome-container">

      {/* Top Header */}
      <div className="welcome-top-header">
        <div className="welcome-logo">Droppa</div>
        <button className="welcome-explore-btn">Explore Now</button>
      </div>

      {/* Background Illustration */}
      <div className="welcome-hero">
        <img
          src={welcomeImage}
          alt="Food Delivery"
          className="welcome-hero-img"
        />
      </div>

      {/* Content */}
      <div className="welcome-content">
        <h1 className="welcome-title">Fast Delivery to Your Doorstep</h1>
        <p className="welcome-subtitle">
          Get meals, groceries, and essentials delivered in minutes.
        </p>

        <button className="welcome-btn">
          Get Started <FiArrowRight className="arrow" />
        </button>

        <p className="welcome-login">
          Already have an account? <span>Log in</span>
        </p>
      </div>
    </div>
  );
}
