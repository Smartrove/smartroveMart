import React from "react";
import styles from "./checkoutSummary.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";

const CheckoutSummary = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (store) => store["cart"]
  );

  return (
    <div>
      <h3>CheckoutSummary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <button className="--btn">
              <Link to="/#products">&larr; Back to shopping</Link>
            </button>
          </>
        ) : (
          <>
            <div>
              <p
                style={{ fontWeight: "800" }}
              >{`Cart Item(s): ${cartTotalQuantity}`}</p>

              <div className={styles.text}>
                <h4>SubTotal:</h4>
                <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
              </div>

              {cartItems &&
                cartItems?.map((item, index) => {
                  const { id, name, price, cartQuantity } = item;
                  return (
                    <Card cardClass={styles.card} key={id}>
                      <h4>Product:{name}</h4>
                      <p style={{ fontWeight: "800" }}>
                        Quantity: {cartQuantity}
                      </p>
                      <p style={{ fontWeight: "800" }}>Price: {`$${price}`}</p>
                      <p style={{ fontWeight: "800" }}>
                        Set Price: {`$${price * cartQuantity}`}
                      </p>
                    </Card>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
