import { Phone } from "@src/entities/app";
import { CartState } from "@src/entities/states";

export type CartContext = {
  state: CartState;
  dispatch: React.Dispatch<CartReducer>;
};

export type CartReducer =
  | { type: "CLEAR_CART" }
  | { type: "LOADING" }
  | { type: "SET_TOTALS_AND_AMOUNT" }
  | { type: "CLEAR_ITEM"; payload: { id: number } }
  | { type: "INCREASE_ITEM"; payload: { id: number } }
  | { type: "DECREASE_ITEM"; payload: { id: number } }
  | { type: "DISPLAY_ITEMS"; payload: { cart: Phone[] } };
