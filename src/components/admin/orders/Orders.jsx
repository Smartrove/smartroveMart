import React from 'react'
import styles from './order.module.scss'
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storeOrders from "../../../redux/features/orderSlice";
import { useEffect } from "react";
import spinner from "../../../assets/spinner.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const navigate = useNavigate();

  const { userId } = useSelector((store) => store["auth"]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={` ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to{" "}
          <span style={{ fontWeight: "600" }}> change order status</span>
        </p>
        <br />

        <>
          {isLoading && (
            <img src={spinner} alt="spinner" className="--center-all" />
          )}
          <div className={styles.table}>
            {order.length === 0 ? (
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
                    {order &&
                      order?.map((order, index) => {
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
    </>
  );
};

export default AdminOrders;