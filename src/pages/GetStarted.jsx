import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/personaldetails.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    setUserData(
      savedUser || {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "08012345678",
      }
    );
  }, []);

  const handleChange = (field, value) => {
    setSaved(false);
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    let e = {};

    if (!userData.name.trim()) e.name = "Full name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email))
      e.email = "Enter a valid email address";

    if (!userData.phone || userData.phone.length < 8)
      e.phone = "Enter a valid phone number";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    localStorage.setItem("userData", JSON.stringify(userData));
    setSaved(true);

    setTimeout(() => navigate(-1), 600);
  };

  return (
    <div className="pi-container">
      {/* Header */}
      <header className="pi-header">
        <button className="pi-back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <h2 className="pi-title">Personal Information</h2>
      </header>

      {/* Card */}
      <section className="pi-card">
        <div className="pi-avatar">
          <FaUserCircle size={95} />
          <p className="pi-avatar-text">Profile photo upload coming soon</p>
        </div>

        {/* Form */}
        <div className="pi-form">
          <div className="pi-input-group">
            <label className="pi-label">Full Name</label>
            <input
              className={`pi-input ${errors.name ? "pi-error" : ""}`}
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="pi-error-text">{errors.name}</span>}
          </div>

          <div className="pi-input-group">
            <label className="pi-label">Email Address</label>
            <input
              className={`pi-input ${errors.email ? "pi-error" : ""}`}
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className="pi-error-text">{errors.email}</span>
            )}
          </div>

          <div className="pi-input-group">
            <label className="pi-label">Phone Number</label>
            <input
              className={`pi-input ${errors.phone ? "pi-error" : ""}`}
              type="tel"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <small className="pi-hint">
              Include country code if applicable
            </small>
            {errors.phone && (
              <span className="pi-error-text">{errors.phone}</span>
            )}
          </div>

          <button className="pi-btn" onClick={handleSave}>
            <FiSave size={18} />
            {saved ? " Saved ✓" : " Save Changes"}
          </button>
        </div>
      </section>
    </div>
  );
}
