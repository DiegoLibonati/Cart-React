import { CartReducer as CartReducerT } from "@src/entities/contexts";
import { CartState } from "@src/entities/states";

import { getTotalAndAmount } from "@src/helpers/getTotalAndAmount";

export const initialState: CartState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

export const CartReducer = (state: CartState, action: CartReducerT) => {
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
