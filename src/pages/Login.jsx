import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi"; 

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔍 Simulated database check
  const checkUserExists = async (number) => {
    // Replace with your real API later
    await new Promise((res) => setTimeout(res, 1200)); // fake delay
    const registeredNumbers = ["08123456789", "09034951446"];
    return registeredNumbers.includes(number);
  };

  const handlePhoneChange = async (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    setPhone(value);

    // When user finishes typing 11 digits → auto check
    if (value.length === 11) {
      setLoading(true);

      const exists = await checkUserExists(value);

      setLoading(false);

      if (exists) {
        navigate("/verify", { state: { phone: value } });
      } else {
        alert("Phone number not found. Please sign up first.");
      }
    }
  };

  const handleContinue = async () => {
    if (phone.length !== 11) {
      alert("Please enter a valid 11-digit phone number");
      return;
    }

    setLoading(true);

    const exists = await checkUserExists(phone);

    setLoading(false);

    if (exists) {
      navigate("/verify", { state: { phone } });
    } else {
      alert("Phone number not found. Please sign up first.");
    }
  };

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
          value={phone}
          onChange={handlePhoneChange}
          maxLength={11}
        />
      </div>

      {/* Continue Button */}
      <button
        className="lp-btn"
        onClick={handleContinue}
        disabled={loading}
        style={loading ? { opacity: 0.6 } : {}}
      >
        {loading ? "Loading..." : "Continue"}
        {!loading && <FiArrowRight className="lp-arrow" />}
      </button>

      {/* Bottom Sign-up */}
      <p className="lp-bottom-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/get-started")}>Sign up</span>
      </p>
    </div>
  );
}
