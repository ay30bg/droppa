import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
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
    setIsDirty(true);
    setSaved(false);

    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!userData.phone || userData.phone.length < 8) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    localStorage.setItem("userData", JSON.stringify(userData));

    setSaved(true);
    setIsDirty(false);

    setTimeout(() => navigate(-1), 600);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <h2>Personal Information</h2>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <FaUserCircle size={90} />
          <p className="avatar-text">Profile photo upload coming soon</p>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "error-input" : ""}
            />
            <small className="hint-text">Include country code if applicable</small>
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <button
            className={`save-btn ${!isDirty ? "disabled" : ""}`}
            onClick={handleSave}
            disabled={!isDirty}
          >
            <FiSave size={18} />
            {saved ? " Saved ✓" : " Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
