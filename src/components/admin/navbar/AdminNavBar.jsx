import React from "react";
import styles from "./adminNavBar.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const AdminNavBar = () => {
  const { userName, email } = useSelector((store) => store["auth"]);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <AccountCircleIcon style={{ fontSize: "35px", color: "#fff" }} />
        <h4>{userName === undefined ? email : userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              View All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/add" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavBar;
