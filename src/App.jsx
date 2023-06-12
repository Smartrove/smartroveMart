import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Home, Contact, Login, Register, ResetPassword } from "./pages";
import { ToastContainer, toast } from "react-toastify";

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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
