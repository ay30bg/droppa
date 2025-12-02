import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";
import "../styles/restaurantdetails.css";

// Restaurants data
const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Chicken Republic", image: image1, rating: 4.5, orders: 800, price: 550, street: "Igbona", time: "20-25 min" },
  { id: 4, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

// Menu data
const restaurantMenus = {
  1: [
    { id: 1, name: "Chicken Burger", price: 1500 },
    { id: 2, name: "Fried Chicken (2pcs)", price: 1200 },
    { id: 3, name: "Chicken Wrap", price: 1000 },
  ],
  2: [
    { id: 1, name: "Beef Steak", price: 2500 },
    { id: 2, name: "Veggie Salad", price: 1200 },
  ],
  3: [
    { id: 1, name: "Chicken Nuggets", price: 900 },
    { id: 2, name: "Fries", price: 500 },
  ],
  4: [
    { id: 1, name: "Grilled Fish", price: 2000 },
    { id: 2, name: "Plantain Chips", price: 600 },
  ],
};

// Time display logic
function getRestaurantTimeDisplay(time) {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 8 ? "Closed" : time;
}

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = featuredRestaurants.find((res) => res.id === parseInt(id));

  if (!restaurant) return <p>Restaurant not found!</p>;

  const menu = restaurantMenus[id] || [];
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const timeText = getRestaurantTimeDisplay(restaurant.time);

  return (
    <div className="restaurant-details-page">
      {/* Back Button */}
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      {/* Restaurant Info */}
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
      <h1>{restaurant.name}</h1>
      <p>Location: {restaurant.street}</p>
      <p>Rating: ⭐ {restaurant.rating} ({restaurant.orders} orders)</p>
      <p>
        <FiTruck style={{ marginRight: "4px" }} />
        Delivery: From {restaurant.price} NGN | {timeText}
      </p>
      <p className={timeText === "Closed" ? "closed" : ""}>
        Status: {timeText === "Closed" ? "Closed" : "Open"}
      </p>

      <hr />

      {/* Menu */}
      <h2>Menu</h2>
      {menu.map((item) => (
        <div key={item.id} className="menu-item">
          <span>{item.name}</span>
          <span>
            {item.price} NGN
            <button onClick={() => addToCart(item)}>Add</button>
          </span>
        </div>
      ))}

      {/* Cart */}
      {cart.length > 0 && (
        <div className="cart">
          <h3>Cart</h3>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>
                {item.price} NGN
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </span>
            </div>
          ))}
          <p className="cart-total">Total: {totalPrice} NGN</p>
          <button className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}
