import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";
import "../styles/home.css";

const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: image1, rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

export default function Home() {
  const navigate = useNavigate();

  const goToRestaurant = (restaurant) => {
    navigate(`/details/${restaurant.id}`, {
      state: { from: "/" },
    });
  };

  return (
    <div className="home-page">
      <h2>Featured</h2>
      <div className="featured-scroll">
        {featuredRestaurants.map((res) => (
          <div
            key={res.id}
            className="featured-card"
            onClick={() => goToRestaurant(res)}
          >
            <img src={res.image} alt={res.name} />
            <h3>{res.name}</h3>
            <p>
              <FiTruck /> From ₦{res.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
