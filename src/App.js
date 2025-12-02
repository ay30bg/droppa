import React from "react";
import "../styles/profile.css";
import { FiChevronRight, FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
  // You can replace this with the logged-in user info
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    id: 12345, // or use UUID / username
  };

  // Extract initials
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">

        {/* Animated Blob Avatar */}
        <div
          className="blob-avatar"
          style={{ "--seed": user.id % 50 }}
        >
          <span className="avatar-text">{initials}</span>
        </div>

        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
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
