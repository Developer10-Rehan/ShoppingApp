import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          totalPrice: product.price * quantity,
        });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
      AsyncStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      cartSlice.caseReducers.calculateTotals(state);
      AsyncStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.product.price * quantity;
      }
      
      cartSlice.caseReducers.calculateTotals(state);
      AsyncStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      AsyncStorage.removeItem('cart');
    },
    loadCart: (state, action) => {
      const cartData = action.payload;
      if (cartData) {
        state.items = cartData.items || [];
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;