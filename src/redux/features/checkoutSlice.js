import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    storeShippingAddress: (state, action) => {
      //store the frontend data for the checkout
      console.log(action.payload);
      state.shippingAddress = action.payload;
    },
    storeBillingAddress: (state, action) => {
      //store the frontend data for the checkout
      console.log(action.payload);

      state.billingAddress = action.payload;
    },
  },
});

export const { storeShippingAddress, storeBillingAddress } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
