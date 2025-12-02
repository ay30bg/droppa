import React from "react";
import Lottie from "lottie-react";
import animationData from import animationData from "https://assets10.lottiefiles.com/packages/lf20_puciaact.json";

export default function Animation() {
  return (
    <div style={{ width: 300, margin: "auto" }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
