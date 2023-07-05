import React from "react";
import styles from "./order.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { storeOrders } from "../../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.jpg";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((store) => store["auth"]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrder = order.filter((order) => order.userId === userId);
  const getOrdersCollection = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "orders");
      const snapshot = await getDocs(collectionRef);

      let allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrder(allData);
    } catch (error) {
      toast.error(error.code);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrdersCollection();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dispatch(storeOrders(order));
  }, [dispatch, order]);

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
