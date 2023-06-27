import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import {
  Home,
  Contact,
  Login,
  Register,
  ResetPassword,
  Admin,
  Cart,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { AdminOnlyRoute } from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Order from "./pages/orderHistory/Order";
import OrderDetails from "./pages/orderHistory/OrderDetails";
import ProductReview from "./components/reviewProducts/ProductReview";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/order-history" element={<Order />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/review-product/:id" element={<ProductReview />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
