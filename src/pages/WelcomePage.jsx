import React from "react";
import "../styles/welcome.css";
import welcomeImage from "../assets/welcomeImage.png"
import { FiArrowRight } from "react-icons/fi";

export default function WelcomePage() {
  return (
    <div className="welcome-container">

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
      </div>
    </div>
  );
}
