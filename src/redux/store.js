import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
