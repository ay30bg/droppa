import React from "react";
import "../styles/profile.css";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <FaUserCircle className="profile-avatar" />
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-email">john.doe@example.com</p>
      </div>

      {/* Content */}
      <div className="profile-section">
        <h3 className="section-title">Account</h3>

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
        <h3 className="section-title">Preferences</h3>

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
        <h3 className="section-title">Support</h3>

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
      <button className="logout-btn">
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}
