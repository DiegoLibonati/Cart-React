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
};

export type Phone = {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
};

export type PayloadReducer = {
  type: string;
  payload?: any;
};

// Interfaces

export interface CartItemProps {
  id: number;
  title: string;
  price: number;
  img: string;
  amount: number;
}
