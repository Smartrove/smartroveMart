import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousUrl: "",
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
          position: "top-left",
        });
      } else {
        //item doesn't exist in the cart, add item to the cart for the first time
        const addData = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(addData);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }

      //save cart to local storage

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} removed from the cart`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.info(`${action.payload.name} removed from the cart`, {
          position: "top-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteFromCart: (state, action) => {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItem;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearItemsFromCart: (state) => {
      state.cartItems = [];
      toast.info(`all items cleared from the cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    calculateSubTotal: (state, action) => {
      const calcArray = [];
      state.cartItems.map((item) => {
        const { cartQuantity, price } = item;
        const cartItemAmount = cartQuantity * price;
        return calcArray.push(cartItemAmount);
      });
      const totalAmount = calcArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    calculateTotalQuantity: (state, action) => {
      const calcArray = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const cartItemQuantities = cartQuantity;
        return calcArray.push(cartItemQuantities);
      });
      const totalQuantities = calcArray.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantities;
    },

    storeUrl: (state, action) => {
      state.previousUrl = action.payload;
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  deleteFromCart,
  clearItemsFromCart,
  resetCart,
  calculateSubTotal,
  calculateTotalQuantity,
  storeUrl,
} = cartSlice.actions;

export default cartSlice.reducer;
