import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProduct: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      const { data, search } = action.payload;

      const filterData = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProduct = filterData;
    },

    sortProducts: (state, action) => {
      const { data, sort } = action.payload;
      let sortData = [];
      if (sort === "latest") {
        sortData = data;
      }

      if (sort === "lowest-price") {
        sortData = data.slice().sort((a, b) => {
          return a.price - b.price;
        });

        // console.log(sortData);
      }

      if (sort === "highest-price") {
        sortData = data.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        sortData = data.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        sortData = data.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProduct = sortData;
    },
  },
});

export const { filterBySearch, sortProducts } = filterSlice.actions;

export default filterSlice.reducer;
