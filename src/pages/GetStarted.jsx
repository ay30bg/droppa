import React, { useState } from "react";
import "../styles/getStarted.css";
import { FiArrowRight } from "react-icons/fi";

export default function GetStartedPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [referral, setReferral] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({ name, phone, email, birthday, referral });
  };

  return (
    <div className="get-started-container">
      
      {/* Header */}
      <h1 className="get-started-title">Create Your Account</h1>
      <p className="get-started-subtext">
        Get started with fast deliveries and exclusive offers.
      </p>

      {/* Sign Up Form */}
      <form className="get-started-form" onSubmit={handleSubmit}>
        <label className="input-label">Full Name</label>
        <input
          type="text"
          className="input-field"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="input-label">Phone Number</label>
        <input
          type="tel"
          className="input-field"
          placeholder="08123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label className="input-label">Email (optional)</label>
        <input
          type="email"
          className="input-field"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="input-label">Birthday</label>
        <input
          type="date"
          className="input-field"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />

        <label className="input-label">Referral Code (optional)</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter code"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />

        <button type="submit" className="get-started-btn">
          Get Started <FiArrowRight className="arrow" />
        </button>
      </form>

      {/* Policy Disclaimer */}
      <p className="policy-text">
        By creating an account, you agree to Droppa’s <span>Terms of Service</span> and <span>Privacy Policy</span>.
      </p>

    </div>
  );
}
