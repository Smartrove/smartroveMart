import React from "react";
import styles from "./orderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDoc from "../../../customHooks/useFetchDoc";
import spinner from "../../../assets/spinner.jpg";
import { useState, useEffect } from "react";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

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
  // console.log(order);
  return (
    <>
      <div className={` ${styles.table}`}>
        <h2> Order Details </h2>

        <div>
          <Link to="/admin/orders">&larr; Back To Order</Link>
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
            <p style={{ fontWeight: "500" }}>
              Shipping Address:
              <br />
              Address: {order.shippingAddress.line1},{" "}
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
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
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}

        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
