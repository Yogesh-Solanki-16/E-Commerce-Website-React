import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.email || user?.phoneNumber || "guest";
};

const getCartKey = () => `cartItems_${getUserId()}`;

const initialState = JSON.parse(localStorage.getItem(getCartKey())) || [];

const StoreSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    add(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem(getCartKey(), JSON.stringify(state));
    },

    remove(state, action) {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem(getCartKey(), JSON.stringify(updatedState));
      return updatedState;
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem(getCartKey(), JSON.stringify(state));
    },

    clearCart() {
      localStorage.removeItem(getCartKey());
      return [];
    },
    
    replaceState(state, action) {
      return action.payload;
    },
  },
});

export const { add, remove, updateQuantity, clearCart, replaceState } =
  StoreSlice.actions;
export default StoreSlice.reducer;