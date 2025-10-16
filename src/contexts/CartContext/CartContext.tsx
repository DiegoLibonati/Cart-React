import React, { useReducer } from "react";

import { CartProviderProps } from "@src/entities/props";
import { CartContext as CartContextT } from "@src/entities/contexts";

import {
  initialState,
  CartReducer,
} from "@src/contexts/CartContext/CartReducer";

export const CartContext = React.createContext<CartContextT | null>(null);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
