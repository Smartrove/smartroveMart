import React, { useEffect } from "react";
import styles from "./cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../../components/card/Card";
import {
  addToCart,
  decreaseCart,
  deleteFromCart,
  clearItemsFromCart,
  calculateSubTotal,
  calculateTotalQuantity,
  storeUrl,
} from "../../redux/features/cartSlice";
import Notiflix from "notiflix";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems } = useSelector((store) => store["cart"]);

  const { cartTotalQuantity } = useSelector((store) => store["cart"]);
  const { cartTotalAmount } = useSelector((store) => store["cart"]);
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(addToCart(cart));
  };
  const decreaseCartItems = (cart) => {
    dispatch(decreaseCart(cart));
  };

  const confirmDeleteItem = (cart) => {
    Notiflix.Confirm.show(
      "Delete Product?",
      "Do you want to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        dispatch(deleteFromCart(cart));
        toast.success(`${cartItems[0].name} deleted from cart`, {
          position: "top-left",
        });
      },
      function cancelCb() {
        toast.success("delete cancelled");
      },
      {
        width: "500px",
        borderRadius: "8px",
        titleColor: "orangered ",
        okButtonBackground: "orangered ",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  const clearCart = () => {
    dispatch(clearItemsFromCart());
  };

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(storeUrl(""));
  }, [dispatch, cartItems]);

  useEffect(() => {
    dispatch(calculateTotalQuantity());
  });

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(storeUrl(url));
      navigate("/login");
    }
  };
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
                    const { id, name, price, imageUrl, cartQuantity } = item;

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
                              onClick={() => decreaseCartItems(item)}
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
                              onClick={() => increaseCart(item)}
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
                            onClick={() => confirmDeleteItem(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear cart
              </button>

              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue Shopping</Link>
                </div>
                <br />

                <Card cardClass={styles.card}>
                  <p
                    style={{ fontWeight: "800" }}
                  >{`Cart item(s):  ${cartTotalQuantity}`}</p>

                  <div className={styles.text}>
                    <h4>Subtotal:</h4>

                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>

                  <div>Tax and shipping calculated at checkout</div>

                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
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
