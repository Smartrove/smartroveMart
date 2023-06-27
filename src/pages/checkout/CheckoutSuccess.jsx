import React from "react";
import styles from "./checkout.module.scss";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Checkout successful</h2>
        <p>Thank you for your purchase</p>
        <br />
        <button className="--btn --btn-primary">
          <Link to="/order-history" style={{ color: "#fff" }}>
            View Order Status
          </Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
