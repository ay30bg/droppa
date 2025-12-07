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
import NotFound from "./pages/NotFound.jsx";
import Orders from "./pages/Orders.jsx";
import Locations from "./pages/Locations.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import Login from "./pages/Login.jsx";
import { CartProvider } from "./context/CartContext.js";
import "./styles/global.css";

function AppWrapper() {
  const location = useLocation();

  // Hide Header on these pages
  const hideHeaderPaths = ["/locations", "/orders", "/profile", "/welcome", "/login"];

  // Hide BottomNav on these pages
  const hideBottomNavPaths = ["/welcome", "/login"];

  return (
    <>
      {/* Conditional Header */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/details/:id" element={<RestaurantDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditional Bottom Navigation */}
      {!hideBottomNavPaths.includes(location.pathname) && <BottomNav />}
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
