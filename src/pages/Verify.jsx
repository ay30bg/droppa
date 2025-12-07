import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verify.css";

export default function VerifyPage() {
  const location = useLocation();
  const phone = location.state?.phone || "";
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]); // 4 boxes
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 4) {
      alert("Please enter the complete OTP");
      return;
    }
    alert(`OTP ${otpCode} verified!`);
    // Navigate to home/dashboard
    // navigate("/home");
  };

  const handleResend = () => {
    setTimer(60);
    setResendEnabled(false);
    setOtp(["", "", "", ""]);
    inputsRef.current[0].focus();
    alert(`OTP resent to ${phone}`);
  };

  return (
    <div className="lp-container"> {/* Login-style container */}

      {/* Greeting */}
      <h1 className="lp-greeting">Verify Your Phone</h1>
      <p className="lp-subtext">
        Enter the 4-digit code sent to <strong>{phone}</strong>
      </p>

      {/* OTP boxes */}
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

      {/* Verify button */}
      <button className="lp-btn" onClick={handleVerify}>
        Verify
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
