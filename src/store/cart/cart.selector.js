import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  cart => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cart => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

// const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
// const newCartTotal = cartItems.reduce(
//   (acc, item) => acc + item.price * item.quantity,
//   0
// );
