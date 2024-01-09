import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(product => product.id === newItem.id);

      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity++;
        state.cartItems[selectCartIndex].totalPrice = state.cartItems[selectCartIndex].quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })
      }
      console.log(newItem);
    },
    decrementQty: (state, action) => {
      const targetItem = action.payload;
      const itemToDecrement = state.cartItems.find(item => item.id === targetItem.id)
      if (itemToDecrement) {
        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1;
          itemToDecrement.totalPrice = itemToDecrement.quantity * targetItem.price;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== targetItem.id)
        }
      }
    },
  },
});

export const { addItemToCart, decrementQty } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectTotalName = (state) => {
  const itemInfo = state.cart.cartItems.map((item) => `${item.title} jumlah ${item.quantity}x`);
  return itemInfo.join(',\n ')
}
export const selectCartTotalPrices = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);

export default cartSlice;

