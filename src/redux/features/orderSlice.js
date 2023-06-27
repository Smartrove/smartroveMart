import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    storeOrders: (state, action) => {
      state.orderHistory = action.payload;
    },
  },
});

export const { storeOrders } = orderSlice.actions;

export default orderSlice.reducer;
