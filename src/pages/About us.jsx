import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/aboutus.css";

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <button className="about-back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <span className="about-title">About Us</span>
      </div>

      {/* Body */}
      <div className="about-body">
        {/* Company Overview */}
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Droppa is a fast, reliable, and convenient food delivery service
            committed to connecting people with their favorite meals from
            restaurants across the city. Our goal is to make food delivery simple
            and enjoyable for everyone.
          </p>
        </section>

        {/* Mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to bring delicious meals to your doorstep quickly
            and efficiently, while supporting local restaurants and enhancing
            the food delivery experience for customers everywhere.
          </p>
        </section>

        {/* Vision */}
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To be the most trusted and loved food delivery platform, known for
            speed, reliability, and exceptional customer experience.
          </p>
        </section>

        {/* Optional Team Section */}
        <section className="about-section">
          <h2>Meet Our Team</h2>
          <p>
            Our team of passionate professionals works tirelessly to connect
            restaurants and customers seamlessly, ensuring every order is
            delivered with care and precision.
          </p>
        </section>
      </div>
    </div>
  );
}
