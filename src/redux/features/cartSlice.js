import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        //existing item in the cart, increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} added again to cart`, {
          position: "bottom-right",
        });
      } else {
        //item doesn't exist in the cart, add item to the cart for the first time
        const addData = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(addData);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-right",
        });
      }

      //save cart to local storage

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
