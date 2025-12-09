import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verify.css";

export default function VerifyPage() {
  const location = useLocation();
  const phone = location.state?.phone || "";
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", ""]); // 5 OTP boxes
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (index < 4) inputsRef.current[index + 1].focus();
  };

  // Handle Backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputsRef.current[index - 1].focus();
    }

    // Prevent letters (optional extra safeguard)
    if (e.key.length === 1 && /\D/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Verify OTP
  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 5) {
      alert("Please enter the complete OTP");
      return;
    }

    setLoading(true);

    // Simulate verification API call
    setTimeout(() => {
      setLoading(false);
      navigate("/"); // Navigate to home page
    }, 1500);
  };

  // Resend OTP
  const handleResend = () => {
    setTimer(60);
    setResendEnabled(false);
    setOtp(["", "", "", "", ""]);
    inputsRef.current[0].focus();
    alert(`OTP resent to ${phone}`);
  };

  return (
    <div className="lp-container">
      <h1 className="lp-greeting">Verify Your Phone</h1>
      <p className="lp-subtext">
        Enter the 5-digit code sent to <strong>{phone}</strong>
      </p>

      {/* OTP Input Boxes */}
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="tel"                // numeric keypad
            inputMode="numeric"       // mobile-friendly
            pattern="[0-9]*"          // restrict digits
            maxLength={1}
            value={value}
            placeholder="-"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-input"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button className="lp-btn" onClick={handleVerify} disabled={loading}>
        {loading ? <div className="loader"></div> : "Verify"}
      </button>

      {/* Resend OTP */}
      <div className="verify-resend">
        {resendEnabled ? (
          <button className="resend-btn" onClick={handleResend}>
            Resend OTP
          </button>
        ) : (
          <p>Resend OTP in {timer}s</p>
        )}
      </div>
    </div>
  );
}
