// src/data/restaurants.js
import image1 from "../assets/chicken republic.jpeg";
import image2 from "../assets/yakoyo.jpg";

export const featuredRestaurants = [
  { id: 1, name: "Chicken Republic", image: image1, rating: 4.8, orders: 1200, price: 650, street: "Ogo Oluwa", time: "25-30 min" },
  { id: 2, name: "The Place", image: "https://tse1.mm.bing.net/th/id/OIP.Ra2X_Mf5GWF2a6Ry1OY9vwHaFj?pid=Api&P=0&h=220", rating: 4.9, orders: 1500, price: 700, street: "Igbona", time: "15-20 min" },
  { id: 3, name: "Chicken Republic", image: image1, rating: 4.5, orders: 800, price: 550, street: "Igbona", time: "20-25 min" },
  { id: 4, name: "Yakoyo", image: image2, rating: 4.7, orders: 1100, price: 600, street: "Estate", time: "20-25 min" },
];

export const restaurantMenus = {
  1: [
    { id: 1, name: "Chicken Burger", price: 1500, description: "Juicy chicken patty with fresh lettuce, tomato, and mayo." },
    { id: 2, name: "Fried Chicken (2pcs)", price: 1200, description: "Crispy fried chicken served with your choice of sauce." },
    { id: 3, name: "Chicken Wrap", price: 1000, description: "Grilled chicken wrapped in a soft tortilla with veggies." },
  ],
  2: [
    { id: 1, name: "Beef Steak", price: 2500, description: "Tender beef steak cooked to perfection with mushroom sauce." },
    { id: 2, name: "Veggie Salad", price: 1200, description: "Fresh mixed greens with cherry tomatoes, cucumbers, and vinaigrette." },
  ],
  3: [
    { id: 1, name: "Chicken Nuggets", price: 900, description: "Golden fried chicken nuggets, perfect for snacking." },
    { id: 2, name: "Fries", price: 500, description: "Crispy potato fries lightly salted for the perfect crunch." },
  ],
  4: [
    { id: 1, name: "Grilled Fish", price: 2000, description: "Freshly grilled fish with a hint of lemon and spices." },
    { id: 2, name: "Plantain Chips", price: 600, description: "Thinly sliced plantains fried until golden and crispy." },
  ],
};

export function getRestaurantTimeDisplay(time) {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 8 ? "Closed" : time;
}
