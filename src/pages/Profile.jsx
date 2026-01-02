import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { FiChevronRight, FiLogOut, FiLogIn } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();

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
    }, 800);
  };

  useEffect(() => {
    loadProfile();
    const handleStorageChange = () => loadProfile();
    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAuthButton = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login");
    }
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
              {isLoggedIn ? profile.name : "Guest User"}
            </h2>
            <p className="profile-email">
              {isLoggedIn
                ? profile.email || "No email added"
                : "You are not logged in"}
            </p>
          </>
        )}
      </div>

      {/* ONLY SHOW SECTIONS IF LOGGED IN */}
      {!loading && isLoggedIn && (
        <>
          {sections.map((section, idx) => (
            <div className="profile-section" key={idx}>
              <h3 className="profile-section-title">{section.title}</h3>

              {section.items.map((item, i) => (
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
        </>
      )}

      {/* AUTH BUTTON */}
      {!loading && (
        <button className="logout-btn" onClick={handleAuthButton}>
          {isLoggedIn ? (
            <>
              <FiLogOut /> Logout
            </>
          ) : (
            <>
              <FiLogIn /> Login
            </>
          )}
        </button>
      )}
    </div>
  );
}
