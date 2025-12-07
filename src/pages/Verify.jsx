import React from "react";
import { useLocation } from "react-router-dom";

export default function VerifyPage() {
  const location = useLocation();
  const phone = location.state?.phone || "";

  return (
    <div style={{ padding: "24px" }}>
      <h1>Verify Phone Number</h1>
      <p>We sent a code to: <strong>{phone}</strong></p>

      <input 
        type="text"
        placeholder="Enter OTP"
        style={{ padding: "12px", fontSize: "16px", marginTop: "16px" }}
      />

      <button style={{ marginTop: "16px", padding: "12px 24px", fontSize: "16px" }}>
        Verify
      </button>
    </div>
  );
}
