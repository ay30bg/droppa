import React, { useState } from "react";
import "../styles/restaurant.css";
import { FiSearch, FiTruck } from "react-icons/fi";

const filterOptions = [
  "Fast Delivery",
  "Rating 4.5+",
  "Near Me",
  "Promos",
  "Popular",
  "New",
  "Free Delivery",
];

// TIME DISPLAY LOGIC (12am – 8am CLOSED)
function getRestaurantTimeDisplay(time) {
  const now = new Date();
  const hour = now.getHours(); // 0–23

  if (hour >= 0 && hour < 8) {
    return "Closed";
  }

  return time;
}

const featuredRestaurants = [
  {
    id: 1,
    name: "Chicken Republic",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220",
    rating: 4.8,
    orders: 1200,
    price: 650,
    street: "Ogo Oluwa",
    time: "25-30 min",
  },
  {
    id: 2,
    name: "Fast Bite",
    image: "https://via.placeholder.com/300x150",
    rating: 4.5,
    orders: 800,
    price: 550,
    street: "Okefia",
    time: "20-25 min",
  },
  {
    id: 3,
    name: "The Place",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220",
    rating: 4.9,
    orders: 1500,
    price: 700,
    street: "Igbona",
    time: "15-20 min",
  },
  {
    id: 4,
    name: "Foodie Spot",
    image: "https://via.placeholder.com/300x150",
    rating: 4.7,
    orders: 1100,
    price: 600,
    street: "Estate",
    time: "20-25 min",
  },
];

export default function Discover() {
  const [search, setSearch] = useState("");

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

      {/* Filters */}
      <div className="filters-scroll">
        {filterOptions.map((filter, index) => (
          <div key={index} className="filter-chip">
            {filter}
          </div>
        ))}
      </div>

      {/* Recommended */}
      <section className="section-wrapper">
        <h2 className="section-title">All Restaurants</h2>

        <div className="recommended-list">
          {featuredRestaurants.map((res) => {
            const timeText = getRestaurantTimeDisplay(res.time);

            return (
              <div key={res.id} className="recommended-card">
                <img src={res.image} alt={res.name} className="recommended-img" />

                <div className="recommended-info-under">
                  <h3>
                    {res.name} - {res.street}
                  </h3>

                  <div className="info-row">
                    <p className={timeText === "Closed" ? "closed" : ""}>
                      <FiTruck style={{ marginRight: "4px" }} /> From {res.price} NGN | {timeText}
                    </p>

                    <p>
                      ⭐ {res.rating.toFixed(1)}({res.orders})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

