import React, { useState, useEffect } from "react";
import "../styles/home.css";
// import { FaPot, FaPlate} from "react-icons/fa";

const categories = [
  { id: 1, name: "Eatery", icon: "🍽️", color: "#FFB74D" },
  { id: 2, name: "Bukka", icon: "🍗" , color: "#4DB6AC" },
  { id: 3, name: "Fast Food", icon:"🍕" , color: "#BA68C8" },
  { id: 4, name: "Drinks", icon: "🍺", color: "#E57373" },
];

const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220", rating: 4.8, price: 650, distance: "2.1 km", time: "25-30 min" },
  { id: 2, name: "Fast Bite", image: "https://via.placeholder.com/300x150", rating: 4.5, price: 550, distance: "3 km", time: "20-25 min" },
  { id: 3, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, price: 700, distance: "1.8 km", time: "15-20 min" },
  { id: 4, name: "Foodie Spot", image: "https://via.placeholder.com/300x150", rating: 4.7, price: 600, distance: "2.5 km", time: "20-25 min" },
  { id: 5, name: "Grill House", image: "https://via.placeholder.com/300x150", rating: 4.6, price: 800, distance: "3.2 km", time: "25-30 min" },
];

featuredRestaurants.sort((a, b) => b.rating - a.rating);

const ads = [
  { id: 1, image: "https://via.placeholder.com/400x180?text=Ad+1", link: "#" },
  { id: 2, image: "https://via.placeholder.com/400x180?text=Ad+2", link: "#" },
  { id: 3, image: "https://via.placeholder.com/400x180?text=Ad+3", link: "#" },
];

export default function Home() {
  // const [search, setSearch] = useState("");
  const [currentAd, setCurrentAd] = useState(0);

  // const handleSearch = () => console.log("Searching for:", search);

  useEffect(() => {
    const interval = setInterval(() => setCurrentAd(prev => (prev + 1) % ads.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Search Bar
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for meals or restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}

      {/* Categories */}
<div className="categories-section">
  {categories.map(cat => (
    <div
      key={cat.id}
      className="category-card"
      style={{ backgroundColor: cat.color }}
    >
      <div className="category-icon">{cat.icon}</div>
      <span>{cat.name}</span>
    </div>
  ))}
</div>


      {/* Featured Restaurants */}
      <section className="featured-section">
        <h2>Featured Restaurants</h2>
        <div className="featured-scroll">
          {featuredRestaurants.map(res => (
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

      {/* Ads Slideshow */}
      <section className="ads-section">
        <h2>Promotions</h2>
        <div className="ads-slider">
          <a href={ads[currentAd].link}>
            <img src={ads[currentAd].image} alt={`Ad ${currentAd + 1}`} />
          </a>
        </div>
      </section>

      {/* Recommended Restaurants */}
      <section className="recommended-section">
        <h2>Recommended</h2>
        <div className="recommended-list">
          {featuredRestaurants.map(res => (
            <div key={res.id} className="recommended-card">
              <img src={res.image} alt={res.name} />
              <div className="recommended-info">
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
