import React, { useState } from "react";
import "../styles/getStarted.css";
import { FiArrowRight } from "react-icons/fi";

export default function GetStarted() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Generate day options 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Month options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate year options from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  const handleSignUp = () => {
    if (!day || !month || !year) {
      alert("Please select your complete birthday");
      return;
    }

    const birthday = `${year}-${months.indexOf(month) + 1}-${day}`;
    console.log("Birthday:", birthday);

    // Continue with sign-up logic
    alert(`Birthday selected: ${birthday}`);
  };

  return (
    <div className="gs-container">

      {/* Greeting */}
      <h1 className="gs-greeting">Create Account</h1>
      <p className="gs-subtext">Fill your details to get started</p>

      {/* Full Name */}
      <div className="gs-input-group">
        <label className="gs-label">Full Name</label>
        <input 
          type="text"
          className="gs-input"
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div className="gs-input-group">
        <label className="gs-label">Email Address</label>
        <input 
          type="email"
          className="gs-input"
          placeholder="example@mail.com"
        />
      </div>

      {/* Phone */}
      <div className="gs-input-group">
        <label className="gs-label">Phone Number</label>
        <input 
          type="tel"
          className="gs-input"
          placeholder="08123456789"
        />
      </div>

      {/* Birthday - Custom Dropdown */}
      <div className="gs-input-group">
        <label className="gs-label">Birthday</label>
        <div className="birthday-dropdowns">
          <select 
            className="gs-select"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select 
            className="gs-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select 
            className="gs-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Referral Code */}
      <div className="gs-input-group">
        <label className="gs-label">Referral Code (Optional)</label>
        <input 
          type="text"
          className="gs-input"
          placeholder="Enter referral code"
        />
      </div>

      {/* Sign Up Button */}
      <button className="gs-btn" onClick={handleSignUp}>
        Sign Up <FiArrowRight className="gs-arrow" />
      </button>

      <p className="gs-policy">
        By signing up, you agree with Droppa’s Term of use.
      </p>
    </div>
  );
}
