import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiEdit3, FiSave, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/personaldetails.css";

export default function PersonalInformationPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    birthday: "",
  });

  // Which field is currently editable
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userData"));

    if (saved) {
      setUserData(saved);
    } else {
      setUserData({
        name: "John Doe",
        phone: "08012345678",
        email: "john.doe@example.com",
        birthday: "1995-02-10",
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setActiveField(null);
    alert("Profile updated successfully");
  };

  const cancelEdit = () => setActiveField(null);

  const formatBirthday = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pi-container">

      {/* HEADER — title beside back button */}
      <div className="pi-header-row">
        <button className="pi-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
        </button>

        <h1 className="pi-header-title">Profile Details</h1>
      </div>


      <div className="pi-section">

        {/* ********** NAME ********** */}
        <div className="pi-card">
          <div className="pi-card-left">
            <span className="pi-label">Account name</span>

            {activeField === "name" ? (
              <input
                className="pi-edit-input"
                value={userData.name}
                onChange={e => handleChange("name", e.target.value)}
                autoFocus
              />
            ) : (
              <span className="pi-value">{userData.name}</span>
            )}
          </div>

          <div className="pi-card-right">
            {activeField === "name" ? (
              <>
                <button className="pi-save-btn" onClick={handleSave}>
                  <FiSave />
                </button>
                <button className="pi-cancel-btn" onClick={cancelEdit}>✕</button>
              </>
            ) : (
              <button onClick={() => setActiveField("name")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>


        {/* ********** PHONE ********** */}
        <div className="pi-card">
          <div className="pi-card-left">
            <span className="pi-label">Phone number</span>

            {activeField === "phone" ? (
              <input
                className="pi-edit-input"
                type="tel"
                value={userData.phone}
                onChange={e => handleChange("phone", e.target.value)}
                autoFocus
              />
            ) : (
              <span className="pi-value">{userData.phone}</span>
            )}
          </div>

          <div className="pi-card-right">
            {activeField === "phone" ? (
              <>
                <button className="pi-save-btn" onClick={handleSave}>
                  <FiSave />
                </button>
                <button className="pi-cancel-btn" onClick={cancelEdit}>✕</button>
              </>
            ) : (
              <button onClick={() => setActiveField("phone")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>


        {/* ********** EMAIL ********** */}
        <div className="pi-card">
          <div className="pi-card-left">
            <span className="pi-label">Email</span>

            {activeField === "email" ? (
              <input
                className="pi-edit-input"
                type="email"
                value={userData.email}
                onChange={e => handleChange("email", e.target.value)}
                autoFocus
              />
            ) : (
              <span className="pi-value">{userData.email}</span>
            )}
          </div>

          <div className="pi-card-right">
            {activeField === "email" ? (
              <>
                <button className="pi-save-btn" onClick={handleSave}>
                  <FiSave />
                </button>
                <button className="pi-cancel-btn" onClick={cancelEdit}>✕</button>
              </>
            ) : (
              <button onClick={() => setActiveField("email")}>
                <FiEdit3 />
              </button>
            )}
          </div>
        </div>


        {/* ********** BIRTHDAY ********** */}
        <div className="pi-card">
          <div className="pi-card-left">
            <span className="pi-label">Date of birth</span>

            {activeField === "birthday" ? (
              <input
                className="pi-edit-input"
                type="date"
                value={userData.birthday}
                onChange={e => handleChange("birthday", e.target.value)}
                autoFocus
              />
            ) : (
              <span className="pi-value">
                {formatBirthday(userData.birthday)}
              </span>
            )}
          </div>

          <div className="pi-card-right">
            {activeField === "birthday" ? (
              <>
                <button className="pi-save-btn" onClick={handleSave}>
                  <FiSave />
                </button>
                <button className="pi-cancel-btn" onClick={cancelEdit}>✕</button>
              </>
            ) : (
              <button onClick={() => setActiveField("birthday")}>
                <FiCalendar />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
