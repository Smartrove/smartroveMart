import React from "react";
import styles from "./checkout.module.scss";
import { useState } from "react";
import Card from "../../components/card/Card";
import { useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import {
  storeShippingAddress,
  storeBillingAddress,
} from "../../redux/features/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";

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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleShipping = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleCountryShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleCountryBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(storeShippingAddress(shippingAddress));
    dispatch(storeBillingAddress(billingAddress));

    navigate("/checkout");
  };

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
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Address Line 1</label>
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Address Line 2</label>
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label htmlFor="">Country</label>

              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleCountryShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
                required
              />
            </Card>

            {/* billing addres */}
            <Card cardClass={styles.card}>
              <h3>Billing Address</h3>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="">Address Line 1</label>
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="">Address Line 2</label>
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label htmlFor="">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label htmlFor="">Country</label>
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleCountryBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
                required
              />

              <button type="submit" className="--btn --btn-primary">
                Proceed to checkout
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
