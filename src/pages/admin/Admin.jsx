import React from "react";
import styles from "./admin.module.scss";
import AdminNavBar from '../../components/admin/navbar/AdminNavBar'
import { Route, Routes } from "react-router-dom";
import {
  AddProduct,
  ViewProducts,
  Orders,
  EditProduct,
  Home,
} from "../../components";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavBar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/all-products" element={<ViewProducts />} />
          <Route path="/add-product/:id" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
