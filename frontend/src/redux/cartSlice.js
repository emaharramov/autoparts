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
        // Ürün zaten sepette var, miktarını arttır
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Yeni ürün ekle
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      // only save to localStorage when there is a change
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // Sepetten ürün silmek
    removeFromCart: (state, action) => {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      if (updatedItems.length !== state.items.length) {
        // Eğer sepet değiştiyse localStorage'ı güncelle
        state.items = updatedItems;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    // Sepetteki ürünü güncellemek (quantity artırma/azaltma)
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        const newQuantity = action.payload.quantity;

        // Eğer quantity sıfır veya daha az ise, ürünü sepetten çıkar
        if (newQuantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity = newQuantity;
        }

        // Eğer sepet değiştiyse localStorage'ı güncelle
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
