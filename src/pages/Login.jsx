import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fake registered emails (replace with real API)
  const registeredEmails = ["user1@example.com", "yekeenolalekan123@gmail.com"];

  // Simple email validation
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleCheckEmail = () => {
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (registeredEmails.includes(email)) {
        navigate("/verify", { state: { email } });
      } else {
        setError("Email is not registered");
      }
      setLoading(false);
    }, 1000);
  };

  // 🔥 Auto-trigger when a valid email is entered
  useEffect(() => {
    if (isValidEmail(email)) {
      handleCheckEmail();
    }
  }, [email]);

  return (
    <div className="lp-container">
      <h1 className="lp-greeting">Welcome Back</h1>
      <p className="lp-subtext">Enter your email to continue</p>

      <div className="lp-input-group">
        <label className="lp-label">Email Address</label>
        <input
          type="email"
          className="lp-input"
          placeholder="e.g. example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className="lp-error">{error}</p>}

      <button
        className="lp-btn"
        onClick={handleCheckEmail}
        disabled={loading}
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            Continue <FiArrowRight className="lp-arrow" />
          </>
        )}
      </button>

      <p className="lp-bottom-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/get-started")}>Get Started</span>
      </p>
    </div>
  );
}
