import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    storeOrders: (state, action) => {
      state.orderHistory = action.payload;
    },

    calculateTotalOrderAmount: (state) => {
      const calcArray = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;
        return calcArray.push(orderAmount);
      });
      const totalAmount = calcArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { storeOrders, calculateTotalOrderAmount } = orderSlice.actions;

export default orderSlice.reducer;
