import React from "react";
import styles from "./checkout.module.scss";
import { useState } from "react";
import Card from "../../components/card/Card";

const initialAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddress });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddress });

  const handleShipping = () => {};
  const handleBilling = () => {};
  const handleSubmit = () => {};
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label htmlFor="">Recipient Name</label>
              <input
                type="text"
                name="name"
                placeholder="recipient name"
                defaultValue={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Address Line 1</label>
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                defaultValue={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Address Line 2</label>
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                defaultValue={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                defaultValue={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                defaultValue={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                defaultValue={shippingAddress.country}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                defaultValue={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
                required
              />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
