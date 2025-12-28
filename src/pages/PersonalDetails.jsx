import React, { useState } from "react";
import { FiArrowLeft, FiEdit2, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/personaldetails.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const savedData = localStorage.getItem("userProfile");
  const initialData = savedData
    ? JSON.parse(savedData)
    : {
        name: "Ayomide Yekeen",
        phone: "09034951446",
        email: "yekeennolalekan123@gmail.com",
        dob: "February 10, 2000",
      };

  const [userData, setUserData] = useState(initialData);
  const [editingField, setEditingField] = useState(null);

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const saveField = () => {
    // ---------- Sync back globally ----------
    localStorage.setItem("userProfile", JSON.stringify(userData));
    setEditingField(null);
  };

  return (
    <div className="pd-page">

      <div className="pd-header">
        <div className="pd-header-left">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
          </button>
          <span className="pd-title">Profile Details</span>
        </div>
      </div>

      <div className="pd-body">

        {/* NAME */}
        <div className="pd-card">
          <label className="pd-label">Account name</label>
          <div className="pd-input-row">
            <input
              type="text"
              value={userData.name}
              disabled={editingField !== "name"}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {editingField === "name" ? (
              <button className="pd-save" onClick={saveField}>
                <FiCheck size={18} />
              </button>
            ) : (
              <button className="pd-edit" onClick={() => setEditingField("name")}>
                <FiEdit2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div className="pd-card">
          <label className="pd-label">Phone number</label>
          <div className="pd-input-row">
            <input
              type="text"
              value={userData.phone}
              disabled={editingField !== "phone"}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {editingField === "phone" ? (
              <button className="pd-save" onClick={saveField}>
                <FiCheck size={18} />
              </button>
            ) : (
              <button className="pd-edit" onClick={() => setEditingField("phone")}>
                <FiEdit2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="pd-card">
          <label className="pd-label">Email</label>
          <div className="pd-input-row">
            <input
              type="email"
              value={userData.email}
              disabled={editingField !== "email"}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {editingField === "email" ? (
              <button className="pd-save" onClick={saveField}>
                <FiCheck size={18} />
              </button>
            ) : (
              <button className="pd-edit" onClick={() => setEditingField("email")}>
                <FiEdit2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* DOB */}
        <div className="pd-card">
          <label className="pd-label">Date of birth</label>
          <div className="pd-input-row">
            <input
              type="text"
              value={userData.dob}
              disabled={editingField !== "dob"}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
            {editingField === "dob" ? (
              <button className="pd-save" onClick={saveField}>
                <FiCheck size={18} />
              </button>
            ) : (
              <button className="pd-edit" onClick={() => setEditingField("dob")}>
                <FiEdit2 size={18} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
