import React from "react";
import { useParams } from "react-router-dom";
import "../styles/restaurant.css";

export default function Restaurant() {
  const { id } = useParams();

  return (
    <div className="restaurant-page">
      <h2>Restaurant #{id}</h2>
      <p>Menu will appear here.</p>
    </div>
  );
}
