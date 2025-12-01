import React, { useState, useEffect } from "react";
import { FiTruck } from "react-icons/fi";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg"
import "../styles/home.css";

// TIME DISPLAY LOGIC (12am – 8am CLOSED)
function getRestaurantTimeDisplay(time) {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 0 && hour < 8) {
    return "Closed";
  }

  return time;
}

const featuredRestaurants = [
  {
    id: 1,
    name: "Chicken Republic",
    image: image1,
    rating: 4.8,
    orders: 1200,
    price: 650,
    street: "Ogo Oluwa",
    time: "25-30 min",
  },
    {
    id: 2,
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
    id: 3,
    name: "Chicken Republic",
    image: image1,
    rating: 4.5,
    orders: 800,
    price: 550,
    street: "Igbona",
    time: "20-25 min",
  },
  {
    id: 4,
    name: "Yakoyo",
    image: image2,
    rating: 4.7,
    orders: 1100,
    price: 600,
    street: "Estate",
    time: "20-25 min",
  },
];

const ads = [
  { id: 1, image: "https://via.placeholder.com/400x180?text=Ad+1", link: "#" },
  { id: 2, image: "https://via.placeholder.com/400x180?text=Ad+2", link: "#" },
  { id: 3, image: "https://via.placeholder.com/400x180?text=Ad+3", link: "#" },
];

// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const [currentAd, setCurrentAd] = useState(0);
  const [featuredRandom, setFeaturedRandom] = useState([]);

  useEffect(() => {
    // Shuffle Featured once per session
    setFeaturedRandom(shuffleArray(featuredRestaurants));

    // Ads slider interval
    const interval = setInterval(
      () => setCurrentAd((prev) => (prev + 1) % ads.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  // Popular restaurants sorted by number of orders (descending)
  const popularRestaurants = [...featuredRestaurants].sort(
    (a, b) => b.orders - a.orders
  );

  return (
    <div className="home-page">
      {/* Promotions */}
      <section className="section-wrapper ads-section">
        <div className="ads-slider">
          <a href={ads[currentAd].link}>
            <img src={ads[currentAd].image} alt={`Ad ${currentAd + 1}`} />
          </a>
        </div>
      </section>

      {/* Featured Restaurants (Random Once Per Session) */}
      <section className="section-wrapper">
        <h2 className="section-title">Featured</h2>
        <div className="featured-scroll">
          {featuredRandom.map((res) => {
            const timeText = getRestaurantTimeDisplay(res.time);
            return (
              <div key={res.id} className="featured-card">
                <img src={res.image} alt={res.name} className="featured-img" />
                <div className="featured-info-under">
                  <h3>
                    {res.name} - {res.street}
                  </h3>
                  <div className="featured-info-row">
                    <p className={timeText === "Closed" ? "closed" : ""}>
                      <FiTruck style={{ marginRight: "4px" }} /> From {res.price} NGN |{" "}
                      {timeText}
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

      <div className="divider"></div>

      {/* Popular Restaurants */}
      <section className="section-wrapper">
        <h2 className="section-title">Popular</h2>
        <div className="featured-scroll">
          {popularRestaurants.map((res) => {
            const timeText = getRestaurantTimeDisplay(res.time);
            return (
              <div key={res.id} className="featured-card">
                <img src={res.image} alt={res.name} className="featured-img" />
                <div className="featured-info-under">
                  <h3>
                    {res.name} - {res.street}
                  </h3>
                  <div className="featured-info-row">
                    <p className={timeText === "Closed" ? "closed" : ""}>
                      <FiTruck style={{ marginRight: "4px" }} /> From {res.price} NGN |{" "}
                      {timeText}
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

      <div className="divider"></div>

      {/* Recommended (by rating) */}
      <section className="section-wrapper">
        <h2 className="section-title">Recommended</h2>
        <div className="recommended-list">
          {featuredRestaurants
            .sort((a, b) => b.rating - a.rating)
            .map((res) => {
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
                        <FiTruck style={{ marginRight: "4px" }} /> From {res.price} NGN |{" "}
                        {timeText}
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


