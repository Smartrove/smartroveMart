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
import { useDispatch } from "react-redux";
import {
  setActiveUser,
  removeActiveUser,
} from "../../redux/features/authSlice";
import { AdminOnlyLink} from "../adminOnlyRoute/AdminOnlyRoute";
import { ShowOnLogin, ShowOnLogOut} from "../hiddenLinks/hiddenLink";

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
  const [showGreetings, setShowGreetings] = useState(false);

  const myDate = new Date();
  const hrs = myDate.getHours();
  const mins = myDate.getMinutes();
  let greeting;

  if (hrs >= 5 && ((hrs === 5 && mins >= 30) || (hrs > 5 && hrs < 12)))
    greeting = "Good Morning";
  else if (hrs >= 12 && hrs < 18) greeting = "Good Afternoon";
  else if ((hrs >= 18 && hrs < 24) || hrs > 0) greeting = "Good Evening";
  else greeting = "Error";

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        let shownName = user.displayName;
        const toBeDisplayed = shownName.split(" ");

        setDisplayName(toBeDisplayed[0]);
        setShowGreetings(true);
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
                <AdminOnlyLink>
                  <Link to='/admin/home'>
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
                {/* {showGreetings ? null : (
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                )} */}
                <ShowOnLogOut>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogOut>

                {/* {showGreetings ? (
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                ) : null} */}
                {/* {showGreetings ? (
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                ) : null} */}
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
              {cart}
            </div>
            <div>
              {/* {showGreetings ? (
                <a href="#" style={{ color: "#ff7722" }}>
                  {greeting}, {displayName}{" "}
                  <WavingHandIcon style={{ fontSize: "30px" }} />
                </a>
              ) : null} */}
              <ShowOnLogin>
                <a href="#" style={{ color: "#ff7722" }}>
                  {greeting}, {displayName}{" "}
                  <WavingHandIcon style={{ fontSize: "30px" }} />
                </a>
                </ShowOnLogin>
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
