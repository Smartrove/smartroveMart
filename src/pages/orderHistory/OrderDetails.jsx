import React from "react";
import styles from "./orderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDoc from "../../customHooks/useFetchDoc";
import spinner from "../../assets/spinner.jpg";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { document } = useFetchDoc({
    collectionName: "orders",
    documentId: id,
  });

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>

        <div>
          <Link to="/order-history">&larr; Back To Order</Link>
        </div>

        <br />
        {order === null ? (
          <img src={spinner} alt="spinner" className="--center-all" />
        ) : (
          <>
            <p style={{ fontWeight: "500" }}>Order Id: {order.id}</p>
            <p style={{ fontWeight: "500" }}>
              Order Amount: ${order.orderAmount}
            </p>
            <p style={{ fontWeight: "500" }}>
              Order Status: {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <td>S/N</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {order.cartItems &&
                  order.cartItems?.map((item, index) => {
                    const { id, price, imageUrl, cartQuantity, name } = item;

                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <p style={{ fontWeight: "500" }}>{name}</p>
                          <img
                            src={imageUrl}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{`$${price}`}</td>
                        <td>{cartQuantity}</td>
                        <td>{`$${price * cartQuantity.toFixed(2)}`}</td>
                        <td className={styles.icon}>
                          <button className="--btn --btn-primary">
                            <Link
                              to={`/review-product/${id}`}
                              style={{ color: "#fff" }}
                            >
                              Review Product
                            </Link>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
