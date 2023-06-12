import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";

const headerLogo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Smartrove <span>Mart...</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <Badge badgeContent={0} color="primary">
        <ShoppingCartIcon style={{ fontSize: "20px" }} />
      </Badge>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid;
        setDisplayName(user.displayName);
      } else {
        setDisplayName("");
      }
    });
  }, []);
  const toggleMenuBar = () => {
    setShowMenu(!showMenu);
  };

  const hideMenuBar = () => {
    setShowMenu(false);
  };
  const navigate = useNavigate();
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("logout successful");
        navigate("/login");
      })
      .catch((error) => {
        error.code = "unable to logout";
        toast.error(error.code);
      });
  };
  return (
    <>
      <ToastContainer />
      <header>
        <div className={styles.header}>
          {headerLogo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenuBar}
            ></div>

            <ul onClick={hideMenuBar}>
              <li className={styles["logo-mobile"]}>
                {headerLogo}
                <CloseIcon
                  onClick={hideMenuBar}
                  style={{ fontSize: "28px", color: "#fff" }}
                />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenuBar}>
              <span className={styles.links}>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>

                <a href="#">
                  <PersonIcon style={{ fontSize: "20px" }} />
                  Hi, {displayName}
                </a>
                <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </span>
              {cart}
            </div>
          </nav>
          <div className={styles["menu-icon"]} onClick={toggleMenuBar}>
            {cart}
            <MenuIcon />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
