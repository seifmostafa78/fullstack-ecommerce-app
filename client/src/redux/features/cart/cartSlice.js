import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (products) =>
  products.reduce((acc, p) => acc + p.price * p.quantity, 0);

const findProductIndex = (products, payload) =>
  products.findIndex(
    (p) =>
      p._id === payload._id &&
      p.color === payload.color &&
      p.size === payload.size
  );

const initialState = {
  cartId: null,
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { _id, products } = action.payload;
      state.cartId = _id;
      state.products = products;
      state.quantity = products.length;
      state.total = calculateTotal(products);
    },
    addToCart: (state, action) => {
      const index = findProductIndex(state.products, action.payload);

      if (index !== -1) {
        state.products[index].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
      }

      state.total = calculateTotal(state.products);
    },
    increaseQuantity: (state, action) => {
      const index = findProductIndex(state.products, action.payload);

      if (index !== -1) {
        state.products[index].quantity += 1;
        state.total = calculateTotal(state.products);
      }
    },
    decreaseQuantity: (state, action) => {
      const index = findProductIndex(state.products, action.payload);

      if (index !== -1) {
        const product = state.products[index];

        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.products.splice(index, 1);
          state.quantity -= 1;
        }

        state.total = calculateTotal(state.products);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const getCart = (state) => state.cart;
export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
