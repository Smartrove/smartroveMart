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
  },
});

export const { filterBySearch } = filterSlice.actions;

export default filterSlice.reducer;
