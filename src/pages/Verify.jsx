import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/verify.css";

export default function VerifyPage() {
  const location = useLocation();
  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next box
    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }
    alert(`OTP ${otpCode} verified!`);
    // TODO: Add real verification logic
  };

  const handleResend = () => {
    setTimer(60);
    setResendEnabled(false);
    setOtp(["", "", "", "", "", ""]);
    inputsRef.current[0].focus();
    alert(`OTP resent to ${phone}`);
  };

  return (
    <div className="verify-container">
      <h1 className="verify-title">Verify Your Phone</h1>
      <p className="verify-subtitle">
        Enter the 6-digit code sent to <strong>{phone}</strong>
      </p>

      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-input"
          />
        ))}
      </div>

      <button className="verify-btn" onClick={handleVerify}>
        Verify
      </button>

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
