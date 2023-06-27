import React from 'react'
import styles from './home.module.scss'
import InfoBox from "../../infoBox/InfoBox";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

//icons
const earningIcon = (
  <MonetizationOnIcon style={{ fontSize: "28px", color: "#b624ff" }} />
);
const productIcon = (
  <ShoppingCartIcon style={{ fontSize: "28px", color: "1f93ff" }} />
);
const orderIcon = (
  <AddShoppingCartIcon style={{ fontSize: "28px", color: "orangered" }} />
);
const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>

      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={15}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={78}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={50}
          icon={orderIcon}
        />
      </div>
    </div>
  );
};

export default Home