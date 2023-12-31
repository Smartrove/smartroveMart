import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload.products;
    },
    getPriceRange: (state, action) => {
      const { products } = action.payload;
      const priceArray = products.map((product) => product.price);
      const max = Math.max(...priceArray);
      const min = Math.min(...priceArray);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { storeProducts, getPriceRange } = productSlice.actions;

export default productSlice.reducer;
