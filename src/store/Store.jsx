import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./StoreSlice";

export const Store = configureStore({
  reducer: {
    cart: cardReducer,
  },
});
