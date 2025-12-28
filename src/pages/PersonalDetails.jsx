import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/personalInfo.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (savedUser) {
      setUserData(savedUser);
    } else {
      setUserData({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "08012345678",
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
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
    navigate(-1);
  };

  return (
    <div className="pi-container">
      
      {/* Header */}
      <div className="pi-header">
        <button className="pi-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>

        <h1 className="pi-title">Personal Information</h1>
        <p className="pi-subtext">Update your account details</p>
      </div>

      {/* Form */}
      <div className="pi-form">

        <div className="pi-input-group">
          <label className="pi-label">Full Name</label>
          <input
            type="text"
            className="pi-input"
            value={userData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="pi-input-group">
          <label className="pi-label">Email Address</label>
          <input
            type="email"
            className="pi-input"
            value={userData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="pi-input-group">
          <label className="pi-label">Phone Number</label>
          <input
            type="tel"
            className="pi-input"
            value={userData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <button className="pi-btn" onClick={handleSave}>
          <FiSave /> Save Changes
        </button>
      </div>
    </div>
  );
}
