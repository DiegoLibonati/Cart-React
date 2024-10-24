import { CartState, PayloadReducer } from "../entities/entities";

import { getTotalAndAmount } from "../helpers/getTotalAndAmount";

const reducer = (state: CartState, action: PayloadReducer) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "CLEAR_ITEM") {
    const arrCart = state.cart.filter((item) => item.id !== action.payload?.id);
    return { ...state, cart: arrCart };
  }

  if (action.type === "INCREASE_ITEM") {
    const arrCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload?.id) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: arrCart };
  }

  if (action.type === "DECREASE_ITEM") {
    const arrCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload?.id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: arrCart };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      cart: action.payload?.cart,
      loading: false,
    };
  }

  if (action.type === "SET_TOTALS_AND_AMOUNT") {
    const { amount, total } = getTotalAndAmount(state.cart);

    return { ...state, amount: amount, total: total };
  }

  throw new Error("Error match");
};

export default reducer;
