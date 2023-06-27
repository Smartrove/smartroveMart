import React from "react";
import styles from "./order.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { storeOrders } from "../../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.jpg";
const Order = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderHistory } = useSelector((store) => store["order"]);
  const { userId } = useSelector((store) => store["auth"]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrder = orderHistory.filter((order) => order.userId === userId);

  useEffect(() => {
    dispatch(storeOrders(data));
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a{" "}
          <span style={{ fontWeight: "600" }}>Product Review</span>
        </p>
        <br />

        <>
          {isLoading && (
            <img src={spinner} alt="spinner" className="--center-all" />
          )}
          <div className={styles.table}>
            {filteredOrder.length === 0 ? (
              <p>No order found</p>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>date</th>
                      <th>orderId</th>
                      <th>orderAmount</th>
                      <th>orderStatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrder &&
                      filteredOrder?.map((order, index) => {
                        const {
                          id,
                          orderDate,
                          orderTime,
                          orderAmount,
                          orderStatus,
                        } = order;

                        return (
                          <tr key={id} onClick={() => handleClick(id)}>
                            <td>{index + 1}</td>
                            <td>
                              {orderDate} at {orderTime}
                            </td>
                            <td>{id}</td>
                            <td>{`$${orderAmount}`}</td>
                            <td>
                              <p
                                className={
                                  orderStatus !== "Delivered"
                                    ? `${styles.pending}`
                                    : `${styles.delivered}`
                                }
                              >
                                {orderStatus}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default Order;
