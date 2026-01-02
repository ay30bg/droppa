
import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  const loadProfile = () => {
    const saved = localStorage.getItem("userProfile");

    setTimeout(() => {
      if (saved) setProfile(JSON.parse(saved));
      setLoading(false);
    }, 800); // simulate async load
  };

  useEffect(() => {
    loadProfile();
    const handleStorageChange = () => loadProfile();
    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/welcome");
  };

  const sections = [
    {
      title: "Account",
      items: ["Personal Information", "Saved Addresses", "Payment Methods"],
    },
    {
      title: "Preferences",
      items: ["Notifications", "Privacy & Security"],
    },
    {
      title: "Support",
      items: ["Help Center", "About Us"],
    },
  ];

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        {loading ? (
          <>
            <div className="skeleton avatar-skeleton" />
            <div className="skeleton text-skeleton name-skeleton" />
            <div className="skeleton text-skeleton email-skeleton" />
          </>
        ) : (
          <>
            <FaUserCircle className="profile-avatar" />
            <h2 className="profile-name">
              {profile.name || "Guest User"}
            </h2>
            <p className="profile-email">
              {profile.email || "No email added"}
            </p>
          </>
        )}
      </div>

      {/* SECTIONS */}
      {sections.map((section, idx) => (
        <div className="profile-section" key={idx}>

          {/* Section Title */}
          {loading ? (
            <div className="skeleton title-skeleton" />
          ) : (
            <h3 className="profile-section-title">{section.title}</h3>
          )}

          {/* Section Items */}
          {loading
            ? section.items.map((_, i) => (
                <div key={i} className="skeleton card-skeleton" />
              ))
            : section.items.map((item, i) => (
                <div
                  key={i}
                  className="profile-item"
                  onClick={() => {
                    if (item === "Personal Information") {
                      navigate("/profile/personal-details");
                    }
                  }}
                >
                  <span>{item}</span>
                  <FiChevronRight />
                </div>
              ))}
        </div>
      ))}

      {/* LOGOUT */}
      {loading ? (
        <div className="skeleton logout-skeleton" />
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      )}
    </div>
  );
}
