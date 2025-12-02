import React from "react";
import "../styles/profile.css";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth token or user info
    localStorage.removeItem("authToken");

    // Navigate to Welcome page
    navigate("/welcome");
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <FaUserCircle className="profile-avatar" />
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-email">john.doe@example.com</p>
      </div>

      {/* Sections */}
      <div className="profile-section">
        <h3 className="profile-section-title">Account</h3>

        <div className="profile-item">
          <span>Personal Information</span>
          <FiChevronRight />
        </div>

        <div className="profile-item">
          <span>Saved Addresses</span>
          <FiChevronRight />
        </div>

        <div className="profile-item">
          <span>Payment Methods</span>
          <FiChevronRight />
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Preferences</h3>

        <div className="profile-item">
          <span>Notifications</span>
          <FiChevronRight />
        </div>

        <div className="profile-item">
          <span>Privacy & Security</span>
          <FiChevronRight />
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Support</h3>

        <div className="profile-item">
          <span>Help Center</span>
          <FiChevronRight />
        </div>

        <div className="profile-item">
          <span>About Us</span>
          <FiChevronRight />
        </div>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}
