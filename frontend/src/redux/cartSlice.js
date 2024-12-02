import { createSlice } from "@reduxjs/toolkit";

// Sepet durumunun başlangıcı
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Sepete ürün eklemek
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items)); // localStorage'a kaydet
    },

    // Sepetten ürün silmek
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // localStorage'a kaydet
    },

    // Sepetteki ürünü güncellemek (quantity artırma/azaltma)
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // localStorage'a kaydet
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
