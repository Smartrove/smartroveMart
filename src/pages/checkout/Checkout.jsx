import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./checkout.module.scss";
import {
  calculateSubTotal,
  calculateTotalQuantity,
} from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing Checkout");

  const dispatch = useDispatch();

  const { cartItems, cartTotalAmount, CartTotalQuantity } = useSelector(
    (store) => store["cart"]
  );

  const { email } = useSelector((store) => store["auth"]);
  const { billingAddress, shippingAddress } = useSelector(
    (store) => store["checkout"]
  );

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [dispatch, cartItems]);

  const description = `payment: Email: ${email}, Amount: ${cartTotalAmount}`;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        email,
        shippingAddress,
        billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("something went wrong");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);
  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
