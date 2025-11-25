import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/foodcard.css";

export default function FoodCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>₦{item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}
