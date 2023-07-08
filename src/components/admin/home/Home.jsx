import React, { useEffect } from "react";
import styles from "./home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { storeOrders } from "../../../redux/features/orderSlice";
import { storeProducts } from "../../../redux/features/productSlice";
import { useMemo } from "react";
import Chart from "../../chart/Chart";


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
  const dispatch = useDispatch();

  const { data: ordersData } = useFetchCollection("orders");

  const { data: productsData } = useFetchCollection("products");

  useEffect(() => {
    dispatch(storeOrders({ orderHistory: ordersData || [] }));

    dispatch(
      storeProducts({
        productsData: productsData || [],
      })
    );
  }, [dispatch, ordersData, productsData]);

  const totalCalculatedOrderAmount = useMemo(() => {
    if (ordersData) {
      return ordersData.reduce(
        (total, order) => total + parseFloat(order.orderAmount),
        0
      );
    }
    return 0;
  }, [ordersData]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>

      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalCalculatedOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={productsData.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={ordersData.length}
          icon={orderIcon}
        />
      </div>
      <Chart />
    </div>
  );
};

export default Home;
