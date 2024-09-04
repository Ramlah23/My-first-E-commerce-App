// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Order from "../pages/Orders/Orders";
import Checkout from "../pages/Checkout"
import PrivateRoute from "../components/Layout/PrivateRoute";
import Products from "../pages/products/products";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} /> 
        {/* Otras rutas públicas */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;