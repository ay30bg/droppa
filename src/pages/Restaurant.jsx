import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/restaurant.css";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";
import { FiSearch, FiTruck } from "react-icons/fi";

// TIME DISPLAY LOGIC (12am – 8am CLOSED)
function getRestaurantTimeDisplay(time) {
  const now = new Date();
  const hour = now.getHours(); // 0–23
  if (hour >= 0 && hour < 8) return "Closed";
  return time;
}

const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Chicken Republic", image: image1, rating: 4.5, orders: 800, price: 550, street: "Igbona", time: "20-25 min" },
  { id: 4, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

export default function Discover() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter restaurants based on search
  const filteredRestaurants = featuredRestaurants.filter(
    (res) =>
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.street.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="discover-page">
      {/* Search Bar */}
      <div className="discover-search">
        <span className="emoji-icon">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Search restaurants or meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* All Restaurants */}
      <section className="section-wrapper">
        <h2 className="section-title">All Restaurants</h2>
        <div className="recommended-list">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((res) => {
              const timeText = getRestaurantTimeDisplay(res.time);
              return (
                <div
                  key={res.id}
                  className="recommended-card"
                  onClick={() => handleCardClick(res.id)}
                  style={{ cursor: "pointer" }} // make card clickable
                >
                  <img src={res.image} alt={res.name} className="recommended-img" />
                  <div className="recommended-info-under">
                    <h3>
                      {res.name} - {res.street}
                    </h3>
                    <div className="info-row">
                      <p className={timeText === "Closed" ? "closed" : ""}>
                        <FiTruck style={{ marginRight: "4px" }} /> From {res.price} NGN | {timeText}
                      </p>
                      <p>⭐ {res.rating.toFixed(1)} ({res.orders})</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ marginTop: "20px" }}>No restaurants found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
