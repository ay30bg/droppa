import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import RestaurantDetails from "./pages/RestaurantDetails.jsx";
import Profile from "./pages/Profile.jsx";
import PersonalDetails from "./pages/PersonalDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Orders from "./pages/Orders.jsx";
import Locations from "./pages/Locations.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import Login from "./pages/Login.jsx";
import Verify from "./pages/Verify.jsx";
import Checkout from "./pages/Checkout.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import { CartProvider } from "./context/CartContext.js";
import "./styles/global.css";

function AppWrapper() {
  const location = useLocation();
  const path = location.pathname;

  // Hide Header on specific pages
  const hideHeader =
    path.startsWith("/details/") || // hide on ALL restaurant detail dynamic pages
    [
      "/locations",
      "/orders",
      "/profile",
      "/welcome",
      "/login",
      "/get-started",
      "/verify",
      "/checkout",
      "/profile/personal-details"
    ].includes(path);

  // Hide BottomNav on specific pages
  const hideBottomNav =
    path.startsWith("/details/") || // hide bottom nav on details page
    ["/welcome", "/login", "/get-started", "/verify", "/checkout"].includes(path);

  return (
    <>
      {/* Conditional Header */}
      {!hideHeader && <Header />}

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/details/:id" element={<RestaurantDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/personal-details" element={<PersonalDetails />} /> 
        <Route path="/orders" element={<Orders />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditional Bottom Navigation */}
      {!hideBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppWrapper />
      </Router>
    </CartProvider>
  );
}
