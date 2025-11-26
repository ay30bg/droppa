// import React, { useState, useEffect } from "react";
// import "../styles/home.css";

// // Quick filters
// const filters = [
//   { id: 1, name: "Fast Food" },
//   { id: 2, name: "Drinks" },
//   { id: 3, name: "Pizza" },
//   { id: 4, name: "Healthy" },
//   { id: 5, name: "Popular" },
//   { id: 6, name: "Nearby" },
// ];

// // Restaurants data
// const featuredRestaurants = [
//   {
//     id: 1,
//     name: "Chicken Republic",
//     image:
//       "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220",
//     rating: 4.8,
//     price: 650,
//     distance: "2.1 km",
//     time: "25-30 min",
//     type: "Fast Food",
//   },
//   {
//     id: 2,
//     name: "Fast Bite",
//     image: "https://via.placeholder.com/300x150",
//     rating: 4.5,
//     price: 550,
//     distance: "3 km",
//     time: "20-25 min",
//     type: "Pizza",
//   },
//   {
//     id: 3,
//     name: "The Place",
//     image:
//       "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220",
//     rating: 4.9,
//     price: 700,
//     distance: "1.8 km",
//     time: "15-20 min",
//     type: "Healthy",
//   },
//   {
//     id: 4,
//     name: "Foodie Spot",
//     image: "https://via.placeholder.com/300x150",
//     rating: 4.7,
//     price: 600,
//     distance: "2.5 km",
//     time: "20-25 min",
//     type: "Drinks",
//   },
// ];

// featuredRestaurants.sort((a, b) => b.rating - a.rating);

// // Ads data
// const ads = [
//   { id: 1, image: "https://via.placeholder.com/400x180?text=Ad+1", link: "#" },
//   { id: 2, image: "https://via.placeholder.com/400x180?text=Ad+2", link: "#" },
//   { id: 3, image: "https://via.placeholder.com/400x180?text=Ad+3", link: "#" },
// ];

// export default function Home() {
//   const [currentAd, setCurrentAd] = useState(0);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filteredRestaurants, setFilteredRestaurants] = useState(
//     featuredRestaurants
//   );

//   useEffect(() => {
//     const interval = setInterval(
//       () => setCurrentAd((prev) => (prev + 1) % ads.length),
//       3500
//     );
//     return () => clearInterval(interval);
//   }, []);

//   // Handle filter selection
//   const handleFilterSelect = (filterName) => {
//     setActiveFilter(filterName);
//     if (!filterName) {
//       setFilteredRestaurants(featuredRestaurants);
//     } else {
//       setFilteredRestaurants(
//         featuredRestaurants.filter((res) => res.type === filterName)
//       );
//     }
//   };

//   return (
//     <div className="home-page">
//       {/* Quick Filters */}
//       <div className="quick-filters">
//         <button
//           className={`filter-btn ${activeFilter === null ? "active" : ""}`}
//           onClick={() => handleFilterSelect(null)}
//         >
//           All
//         </button>
//         {filters.map((filter) => (
//           <button
//             key={filter.id}
//             className={`filter-btn ${
//               activeFilter === filter.name ? "active" : ""
//             }`}
//             onClick={() => handleFilterSelect(filter.name)}
//           >
//             {filter.name}
//           </button>
//         ))}
//       </div>

//       {/* Featured Restaurants */}
//       <section className="section-wrapper">
//         <h2 className="section-title">Featured Restaurants</h2>
//         <div className="featured-scroll">
//           {filteredRestaurants.map((res) => (
//             <div key={res.id} className="featured-card">
//               <img src={res.image} alt={res.name} className="featured-img" />
//               <div className="featured-info-under">
//                 <h3>{res.name}</h3>
//                 <div className="featured-info-row">
//                   <p>
//                     From {res.price} NGN | {res.distance} • {res.time}
//                   </p>
//                   <p>⭐ {res.rating.toFixed(1)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Ads */}
//       <section className="section-wrapper">
//         <h2 className="section-title">Promotions</h2>
//         <div className="ads-slider">
//           <a href={ads[currentAd].link}>
//             <img src={ads[currentAd].image} alt={`Ad ${currentAd + 1}`} />
//           </a>
//         </div>
//       </section>

//       {/* Recommended */}
//       <section className="section-wrapper">
//         <h2 className="section-title">Recommended</h2>
//         <div className="recommended-list">
//           {filteredRestaurants.map((res) => (
//             <div key={res.id} className="recommended-card">
//               <img src={res.image} alt={res.name} className="recommended-img" />
//               <div className="recommended-info-under">
//                 <h3>{res.name}</h3>
//                 <div className="info-row">
//                   <p>
//                     From {res.price} NGN | {res.distance} • {res.time}
//                   </p>
//                   <p>⭐ {res.rating.toFixed(1)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/home.css";

const quickFilters = [
  "Fast Food",
  "Rice Meals",
  "Drinks",
  "Snacks",
  "Desserts",
  "Vegan",
  "Grill",
];

const featuredRestaurants = [
  {
    id: 1,
    name: "Chicken Republic",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.cu-OykdV59cvbG-DZ7Gi7QHaD3?pid=Api&P=0&h=220",
    rating: 4.8,
    price: 650,
    distance: "2.1 km",
    time: "25-30 min",
  },
  {
    id: 2,
    name: "Fast Bite",
    image: "https://via.placeholder.com/300x150",
    rating: 4.5,
    price: 550,
    distance: "3 km",
    time: "20-25 min",
  },
  {
    id: 3,
    name: "The Place",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220",
    rating: 4.9,
    price: 700,
    distance: "1.8 km",
    time: "15-20 min",
  },
  {
    id: 4,
    name: "Foodie Spot",
    image: "https://via.placeholder.com/300x150",
    rating: 4.7,
    price: 600,
    distance: "2.5 km",
    time: "20-25 min",
  },
];

featuredRestaurants.sort((a, b) => b.rating - a.rating);

const ads = [
  { id: 1, image: "https://via.placeholder.com/400x180?text=Ad+1", link: "#" },
  { id: 2, image: "https://via.placeholder.com/400x180?text=Ad+2", link: "#" },
  { id: 3, image: "https://via.placeholder.com/400x180?text=Ad+3", link: "#" },
];

export default function Home() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentAd((prev) => (prev + 1) % ads.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Quick Filters */}
      <div className="quick-filters">
        {quickFilters.map((filter, idx) => (
          <button key={idx} className="filter-btn">
            {filter}
          </button>
        ))}
      </div>

      {/* Promotions */}
      <section className="section-wrapper">
        <div className="ads-slider">
          <a href={ads[currentAd].link}>
            <img src={ads[currentAd].image} alt={`Ad ${currentAd + 1}`} />
          </a>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="section-wrapper">
        <h2 className="section-title">Featured Restaurants</h2>
        <div className="featured-scroll">
          {featuredRestaurants.map((res) => (
            <div key={res.id} className="featured-card">
              <img src={res.image} alt={res.name} className="featured-img" />
              <div className="featured-info-under">
                <h3>{res.name}</h3>
                <div className="featured-info-row">
                  <p>
                    From {res.price} NGN | {res.distance} • {res.time}
                  </p>
                  <p>⭐ {res.rating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="section-wrapper">
        <h2 className="section-title">Recommended</h2>
        <div className="recommended-list">
          {featuredRestaurants.map((res) => (
            <div key={res.id} className="recommended-card">
              <img src={res.image} alt={res.name} className="recommended-img" />
              <div className="recommended-info-under">
                <h3>{res.name}</h3>
                <div className="info-row">
                  <p>
                    From {res.price} NGN | {res.distance} • {res.time}
                  </p>
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
