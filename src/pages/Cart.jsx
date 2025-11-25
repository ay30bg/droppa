import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css";

export default function Cart() {
  const { cart, total } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>₦{item.price}</span>
          </div>
        ))
      )}

      <h3>Total: ₦{total}</h3>
    </div>
  );
}
