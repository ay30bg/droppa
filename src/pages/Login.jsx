import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { FiArrowRight } from "react-icons/fi";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Mock API to simulate registered numbers
  const checkPhoneExists = async (phoneNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const registered = ["08123456789", "09034951446"]; // demo numbers
        resolve(registered.includes(phoneNumber));
      }, 1200);
    });
  };

  const handleContinue = async () => {
    setErrorMsg("");

    // Validate phone
    if (phone.length !== 11) {
      setErrorMsg("Phone number must be 11 digits.");
      return;
    }

    setLoading(true);

    const exists = await checkPhoneExists(phone);

    setLoading(false);

    if (!exists) {
      setErrorMsg("This phone number is not registered.");
      return;
    }

    // Navigate to OTP
    navigate("/verify", { state: { phone } });
  };

  return (
    <div className="lp-container">

      {/* Greeting */}
      <h1 className="lp-greeting">Welcome Back</h1>
      <p className="lp-subtext">Enter your phone number to continue</p>

      {/* Error message */}
      {errorMsg && <p className="lp-error">{errorMsg}</p>}

      {/* Phone Input */}
      <div className="lp-input-group">
        <label className="lp-label">Phone Number</label>
        <input
          type="tel"
          className="lp-input"
          placeholder="e.g. 08123456789"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrorMsg("");
          }}
          maxLength={11}
        />
      </div>

      {/* Continue Button */}
      <button className="lp-btn" onClick={handleContinue} disabled={loading}>
        {loading ? (
          <div className="lp-spinner"></div>
        ) : (
          <>
            Continue <FiArrowRight className="lp-arrow" />
          </>
        )}
      </button>

      {/* Bottom Signup Link */}
      <p className="lp-bottom-text">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/get-started")}>Get Started</span>
      </p>
    </div>
  );
}
