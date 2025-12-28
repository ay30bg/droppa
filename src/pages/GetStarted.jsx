import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/getStarted.css";
import { FiArrowRight } from "react-icons/fi";

// ---------- Phone Formatter ----------
const formatNigerianPhone = (value = "") => {
  let phone = value.replace(/\D/g, "");

  if (phone.startsWith("234")) phone = "0" + phone.slice(3);
  if (phone.length === 10 && !phone.startsWith("0")) phone = "0" + phone;

  return phone.slice(0, 11);
};

export default function GetStarted() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // ---------- Prefill from saved profile ----------
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (!saved) return;

    const p = JSON.parse(saved);

    setFullName(p.name || "");
    setEmail(p.email || "");
    setPhone(p.phone || "");

    if (p.dob) {
      const [m, dRaw, y] = p.dob.split(" ");
      setMonth(m || "");
      setDay((dRaw || "").replace(/\D/g, ""));
      setYear(y || "");
    }
  }, []);

  const handleSignUp = () => {
    const isValidPhone = phone.startsWith("0") && phone.length === 11;

    if (!fullName || !email || !isValidPhone || !day || !month || !year) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const dob = `${month} ${day}, ${year}`;

    const profileData = {
      name: fullName,
      email,
      phone,
      dob,
      referralCode,
    };

    // ---------- Save profile globally ----------
    localStorage.setItem("userProfile", JSON.stringify(profileData));

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/verify", { state: { phone, mode: "signup" } });
    }, 1500);
  };

  return (
    <div className="gs-container">
      <h1 className="gs-greeting">Create Account</h1>
      <p className="gs-subtext">Fill your details to get started</p>

      {/* Full Name */}
      <div className="gs-input-group">
        <label className="gs-label">Full Name</label>
        <input
          type="text"
          className="gs-input"
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="gs-input-group">
        <label className="gs-label">Email Address</label>
        <input
          type="email"
          className="gs-input"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="gs-input-group">
        <label className="gs-label">Phone Number</label>
        <input
          type="tel"
          className="gs-input"
          placeholder="08123456789"
          value={phone}
          onChange={(e) => setPhone(formatNigerianPhone(e.target.value))}
        />
      </div>

      {/* Birthday */}
      <div className="gs-input-group">
        <label className="gs-label">Birthday</label>
        <div className="birthday-dropdowns">
          <select className="gs-select" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="gs-select" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            {months.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="gs-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
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
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
      </div>

      <button className="gs-btn" onClick={handleSignUp} disabled={loading}>
        {loading ? <div className="loader"></div> : <>Get Started <FiArrowRight className="gs-arrow" /></>}
      </button>

      <p className="gs-policy">
        By signing up, you agree with Droppa’s Term of use.
      </p>
    </div>
  );
}
