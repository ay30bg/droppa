import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Orders from "./pages/Orders.jsx";
import { CartProvider } from "./context/CartContext.js";
import "./styles/global.css";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </Router>
    </CartProvider>
  );
}

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Header from "./components/Header.jsx";
// import BottomNav from "./components/BottomNav.jsx";
// import Home from "./pages/Home.jsx";
// import Cart from "./pages/Cart.jsx";
// import TrackOrder from "./pages/TrackOrder.jsx";
// import Restaurant from "./pages/Restaurant.jsx";
// import Profile from "./pages/Profile.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import { CartProvider } from "./context/CartContext.js";
// import "./styles/global.css";

// function AppWrapper() {
//   const location = useLocation();
//   const hideHeaderPaths = ["/track"]; // add more paths if needed

//   return (
//     <>
//       {!hideHeaderPaths.includes(location.pathname) && <Header />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/track" element={<TrackOrder />} />
//         <Route path="/restaurant/:id" element={<Restaurant />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <BottomNav />
//     </>
//   );
// }

// export default function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <AppWrapper />
//       </Router>
//     </CartProvider>
//   );
// }
