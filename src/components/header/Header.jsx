import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  removeActiveUser,
} from "../../redux/features/authSlice";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import { ShowOnLogin, ShowOnLogOut } from "../hiddenLinks/hiddenLink";
import { calculateTotalQuantity } from "../../redux/features/cartSlice";

const headerLogo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop <span>Swift...</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const { cartTotalQuantity } = useSelector((store) => store["cart"]);

  const { email } = useSelector((store) => store["auth"]);
  const myDate = new Date();
  const hrs = myDate.getHours();
  const mins = myDate.getMinutes();
  let greeting;

  if (hrs >= 5 && ((hrs === 5 && mins >= 30) || (hrs > 5 && hrs < 12)))
    greeting = "Good Morning";
  else if (hrs >= 12 && hrs < 18) greeting = "Good Afternoon";
  else if ((hrs >= 18 && hrs < 24) || hrs > 0) greeting = "Good Evening";
  else greeting = "Good Morning";

  const dispatch = useDispatch();

  //fix navbar
  const fixedNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixedNavbar);

  //calculate cart total quantity
  useEffect(() => {
    dispatch(calculateTotalQuantity());
  }, []);

  // monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        let shownName = user.displayName;

        setDisplayName(shownName);
        //
        //extract name from of null displayName
        if (user.displayName === null) {
          // const nameFromEmail = user.email.slice(0, -10);// first method
          const nameFromEmail = user.email.substring(
            0,
            user.email.indexOf("@")
          ); // second method

          const capitalizedName =
            nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

          setDisplayName(capitalizedName);
        }

        dispatch(
          setActiveUser({
            email: user.email,
            username: user.displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(removeActiveUser());
      }
    });
  }, [dispatch]);
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
        // dispatch(resetCart());
        toast.success("logout successful");
        navigate("/");
      })
      .catch((error) => {
        error.code = "unable to logout";
        toast.error(error.code);
      });
  };
  return (
    <>
      <ToastContainer />
      <header className={scrollPage ? `${styles.fixed}` : null}>
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
                <AdminOnlyLink>
                  <Link to="/admin/home">
                    <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>
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
                <ShowOnLogOut>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogOut>

                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              <span className={styles.cart}>
                <Link to="/cart">
                  Cart
                  {email === null ? null : (
                    <>
                      <Badge badgeContent={cartTotalQuantity} color="primary">
                        <ShoppingCartIcon style={{ fontSize: "20px" }} />
                      </Badge>
                    </>
                  )}
                </Link>
              </span>
            </div>
            <div>
              <ShowOnLogin>
                <a href="#" style={{ color: "#ff7722" }}>
                  {greeting}, {displayName}{" "}
                  <WavingHandIcon style={{ fontSize: "30px" }} />
                </a>
              </ShowOnLogin>
            </div>
          </nav>
          <div className={styles["menu-icon"]} onClick={toggleMenuBar}>
            <span className={styles.cart}>
              <Link to="/cart">
                Cart
                <Badge badgeContent={`${cartTotalQuantity}`} color="primary">
                  <ShoppingCartIcon style={{ fontSize: "20px" }} />
                </Badge>
              </Link>
            </span>
            <MenuIcon />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
