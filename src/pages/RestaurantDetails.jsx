 import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiStar, FiClock, FiTruck } from "react-icons/fi";
import "../styles/restaurantdetails.css";
import { featuredRestaurants, restaurantMenus } from "../data/restaurants";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");

  const restaurant = featuredRestaurants.find(
    (res) => res.id === parseInt(id)
  );

  if (!restaurant) return <p>Restaurant not found</p>;

  const menu = restaurantMenus[id] || [];

  const addToCart = (item) => setCart([...cart, item]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="rd-container">

      {/* Header */}
      <div className="rd-header">
        <button className="rd-back" onClick={() => navigate(-1)}>
          <FiChevronLeft size={22} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="rd-hero">
        <img src={restaurant.image} alt="" />
        <div className="rd-hero-overlay"></div>
        <div className="rd-hero-info">
          <h1>{restaurant.name}</h1>
          <div className="rd-tags-row">
            <span><FiStar /> {restaurant.rating}</span>
            <span>{restaurant.street}</span>
            <span><FiClock /> {restaurant.time}</span>
            <span><FiTruck /> From {restaurant.price} NGN</span>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="rd-tabs">
        <button 
          className={activeTab === "menu" ? "active" : ""}
          onClick={() => setActiveTab("menu")}
        >
          Menu
        </button>

        <button 
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>

        <button 
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* MENU SECTION */}
      {activeTab === "menu" && (
        <div className="rd-menu-list">
          {menu.map((item) => (
            <div key={item.id} className="rd-menu-card">
              
              <div className="rd-menu-info">
                <h3>{item.name}</h3>
                <p className="rd-menu-price">{item.price} NGN</p>
                <button 
                  className="rd-add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              </div>

              <div className="rd-menu-img"></div>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT SECTION */}
      {activeTab === "about" && (
        <div className="rd-about">
          <h3>About {restaurant.name}</h3>
          <p>
            Great meals delivered fresh. Healthy options available. Fast delivery 
            around {restaurant.street}. Rated {restaurant.rating} stars.
          </p>
        </div>
      )}

      {/* REVIEWS SECTION */}
      {activeTab === "reviews" && (
        <div className="rd-reviews">
          <p>No reviews yet</p>
        </div>
      )}

      {/* Bottom Cart */}
      {cart.length > 0 && (
        <div className="rd-cart-bar">
          <div>
            {cart.length} item(s) • {totalPrice} NGN
          </div>
          <button className="rd-cart-btn">View Cart</button>
        </div>
      )}
    </div>
  );
}
