import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json"; // path to your JSON

export default function Animation() {
  return (
    <div style={{ width: 300, margin: "auto" }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
