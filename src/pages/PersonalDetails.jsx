import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave, FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/personaldetails.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
  });

  // controls which field is editable
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    birthday: false,
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
        birthday: "1995-01-01",
      });
    }
  }, []);

  const enableField = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));

    // lock all inputs again after saving
    setIsEditing({
      name: false,
      email: false,
      phone: false,
      birthday: false,
    });

    alert("Profile updated successfully!");
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
        <p className="pi-subtext">Tap the pencil icon to edit a field</p>
      </div>

      <div className="pi-form">

        {/* NAME */}
        <div className="pi-input-group">
          <label className="pi-label">Full Name</label>

          <div className="pi-input-wrap">
            <input
              type="text"
              className="pi-input"
              value={userData.name}
              disabled={!isEditing.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            {!isEditing.name && (
              <button className="pi-edit-btn" onClick={() => enableField("name")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="pi-input-group">
          <label className="pi-label">Email Address</label>

          <div className="pi-input-wrap">
            <input
              type="email"
              className="pi-input"
              value={userData.email}
              disabled={!isEditing.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            {!isEditing.email && (
              <button className="pi-edit-btn" onClick={() => enableField("email")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div className="pi-input-group">
          <label className="pi-label">Phone Number</label>

          <div className="pi-input-wrap">
            <input
              type="tel"
              className="pi-input"
              value={userData.phone}
              disabled={!isEditing.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            {!isEditing.phone && (
              <button className="pi-edit-btn" onClick={() => enableField("phone")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>

        {/* BIRTHDAY */}
        <div className="pi-input-group">
          <label className="pi-label">Birthday</label>

          <div className="pi-input-wrap">
            <input
              type="date"
              className="pi-input"
              value={userData.birthday}
              disabled={!isEditing.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />

            {!isEditing.birthday && (
              <button className="pi-edit-btn" onClick={() => enableField("birthday")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>

        {/* SAVE BUTTON */}
        {Object.values(isEditing).some(v => v) && (
          <button className="pi-btn" onClick={handleSave}>
            <FiSave /> Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
