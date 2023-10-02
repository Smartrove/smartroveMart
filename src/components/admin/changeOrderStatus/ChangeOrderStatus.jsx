import React from "react";
import styles from "./changeOrderStatus.module.scss";
import spinner from "../../../assets/spinner.jpg";
import Card from "../../card/Card";
import { useState } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  const editOrderStatus = async (e, id) => {
    setIsLoading(true);
    e.preventDefault();
    const orderConfig = {
      userId: order.userId,
      email: order.email,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      const docRef = await setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("order status changed successfully");
      navigate("/admin/orders");
    } catch (error) {
      toast.error(error.code);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <img src={spinner} alt="spinner" className="--center-all" />
      )}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrderStatus(e, id)}>
            <span>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  {" "}
                  -- Choose one{" "}
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>

            <span>
              <button className="--btn --btn-primary" type="submit">
                Update status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
