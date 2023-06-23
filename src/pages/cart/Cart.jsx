import React from "react";
import styles from "./cart.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../../components/card/Card";

const Cart = () => {
  const { cartItems } = useSelector((store) => store["cart"]);
  const { cartTotalQuantity } = useSelector((store) => store["cart"]);
  const { cartTotalAmount } = useSelector((store) => store["cart"]);
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems?.map((item, index) => {
                    const {
                      id,
                      name,
                      price,
                      imageUrl,
                      category,
                      cartQuantity,
                    } = item;

                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={imageUrl}
                            alt="name"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <p>
                            <b style={{ fontWeight: "800" }}>{name}</b>
                          </p>
                        </td>
                        <td>
                          <div className={styles.count}>
                            <button
                              className="--btn"
                              style={{ backgroundColor: "lightgray" }}
                            >
                              {" "}
                              -{" "}
                            </button>
                            <p>
                              <b>{cartQuantity}</b>
                            </p>
                            <button
                              className="--btn"
                              style={{ backgroundColor: "lightgray" }}
                            >
                              {" "}
                              +{" "}
                            </button>
                          </div>
                        </td>
                        <td>{`$${price}`}</td>
                        <td>{`$${(price * cartQuantity).toFixed(2)}`}</td>
                        <td className={styles.icons}>
                          <DeleteIcon
                            style={{ fontSize: "28px", color: "red" }}
                            // onClick={() => confirmDeleteProduct(id, imageUrl)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger">Clear cart</button>

              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue Shopping</Link>
                </div>
                <br />

                <Card cardClass={styles.card}>
                  <p>{`Cart item(s):  ${cartTotalQuantity}`}</p>

                  <div className={styles.text}>
                    <h4>Subtotal:</h4>

                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>

                  <div>Tax and shipping calculated at checkout</div>

                  <button className="--btn --btn-primary --btn-block">
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
