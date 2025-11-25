import React, { useState } from "react";
import "../styles/discover.css";
import { FiSearch } from "react-icons/fi";

const filterOptions = [
  "Fast Delivery",
  "Rating 4.5+",
  "Near Me",
  "Promos",
  "Popular",
  "New",
  "Free Delivery",
];

const trending = [
  {
    id: 1,
    name: "Chicken Republic",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220",
    rating: 4.8,
    price: 650,
    distance: "2.1 km",
    time: "25–30 min",
  },
  {
    id: 2,
    name: "The Place",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220",
    rating: 4.9,
    price: 700,
    distance: "1.8 km",
    time: "20–25 min",
  },
  {
    id: 3,
    name: "Foodie Spot",
    image: "https://via.placeholder.com/300x150",
    rating: 4.7,
    price: 600,
    distance: "2.5 km",
    time: "20–25 min",
  },
];

export default function Discover() {
  const [search, setSearch] = useState("");

  return (
    <div className="discover-page">
      {/* Search Bar */}
      <div className="discover-search">
        <span className="emoji-icon"><FiSearch /></span>
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

      <hr className="horizontal-rule" />

      {/* Trending Section like Featured */}
      <section className="featured-section">
        <h2>Trending Near You</h2>
        <div className="featured-scroll">
          {trending.map((res) => (
            <div key={res.id} className="featured-card">
              <img src={res.image} alt={res.name} />
              <div className="featured-info">
                <h3>{res.name}</h3>
                <div className="info-row">
                  <p>From {res.price} NGN | {res.distance} • {res.time}</p>
                  <p>⭐ {res.rating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
