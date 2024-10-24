// Types

export type CartState = {
  loading: boolean;
  cart: Phone[];
  total: number;
  amount: number;
};

export type AppContextT = {
  loading: boolean;
  cart: Phone[];
  total: number;
  amount: number;
  clearCart: () => void;
  clearItem: (id: number) => void;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  displayItems: (cart: Phone[]) => void;
  setLoading: () => void;
};

export type Phone = {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
};

export type PayloadReducer =
  | { type: "CLEAR_CART" }
  | { type: "LOADING" }
  | { type: "SET_TOTALS_AND_AMOUNT" }
  | { type: "CLEAR_ITEM"; payload: { id: number } }
  | { type: "INCREASE_ITEM"; payload: { id: number } }
  | { type: "DECREASE_ITEM"; payload: { id: number } }
  | { type: "DISPLAY_ITEMS"; payload: { cart: Phone[] } };

// Interfaces

export interface CartItemProps {
  id: number;
}
