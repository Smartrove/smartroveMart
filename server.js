const express = require("express");
const app = express();
const dotenv = require("dotenv/config");
const cors = require("cors");

// This is your test secret API key.
const stripe = require("stripe")(process.env.REACT_STRIPE_PK_KEY);

app.get("/", (req, res) => {
  res.json("Welcome To Home");
});

const calcArray = [];
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  items.map((item) => {
    const { cartQuantity, price } = item;
    const cartItemAmount = cartQuantity * price;
    return calcArray.push(cartItemAmount);
  });
  const totalAmount = calcArray.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shippingAddress, description, email } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },

    description,
    shippingAddress: {
      address: {
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        country: shippingAddress.country,
        postal_code: shippingAddress.postal_code,
      },
      name: shippingAddress.name,
      phone: shippingAddress.phone,
    },
    receipt_email: email,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use(cors);
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 4242;
app.listen(process.env.PORT, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);
