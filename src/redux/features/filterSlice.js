import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProduct: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      const { filteredProduct, search } = action.payload;

      const filterData = filteredProduct.filter(
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

    filterByCategory: (state, action) => {
      const { data, category } = action.payload;
      let categoryData = [];

      if (category === "All") {
        categoryData = data;
      } else {
        categoryData = data.filter((item) => item.category === category);
      }

      state.filteredProduct = categoryData;
    },
    filterByBrand: (state, action) => {
      const { data, brand } = action.payload;
      let brandData = [];

      if (brand === "All") {
        brandData = data;
      } else {
        brandData = data.filter((item) => item.brand === brand);
      }

      state.filteredProduct = brandData;
    },

    filterByPrice: (state, action) => {
      const { data, price } = action.payload;
      const priceData = data.filter((item) => item.price <= price);

      state.filteredProduct = priceData;
    },
  },
});

export const {
  filterBySearch,
  sortProducts,
  filterByCategory,
  filterByBrand,
  filterByPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
