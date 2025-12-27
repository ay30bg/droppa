import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  // Load user data from localStorage (or API)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load saved data on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setUserData(savedUser);
    } else {
      // Default placeholder
      setUserData({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "08012345678",
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Save user data
  const handleSave = () => {
    // Validate email and phone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!userData.phone || userData.phone.length < 8) {
      alert("Please enter a valid phone number");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Personal information updated successfully!");
    navigate(-1); // go back to Profile page
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>
        <h2>Personal Information</h2>
      </div>

      {/* Profile Picture */}
      <div className="profile-picture-section">
        <FaUserCircle size={80} />
        <p>Profile picture upload coming soon</p>
      </div>

      {/* Form */}
      <div className="profile-form">
        <label>
          Full Name
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            value={userData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </label>

        <button className="save-btn" onClick={handleSave}>
          <FiSave size={18} /> Save
        </button>
      </div>
    </div>
  );
}
