import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/restaurant.css";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";
import { FiSearch, FiTruck } from "react-icons/fi";

function getRestaurantTimeDisplay(time) {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 8) return "Closed";
  return time;
}

const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: image1, rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

export default function Discover() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`, {
      state: { from: "/restaurant" },
    });
  };

  return (
    <div className="discover-page">
      <div className="discover-search">
        <FiSearch />
        <input
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recommended-list">
        {featuredRestaurants.map((res) => (
          <div
            key={res.id}
            className="recommended-card"
            onClick={() => handleCardClick(res.id)}
          >
            <img src={res.image} alt={res.name} />
            <h3>{res.name}</h3>
            <p>
              <FiTruck /> From ₦{res.price} |{" "}
              {getRestaurantTimeDisplay(res.time)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
