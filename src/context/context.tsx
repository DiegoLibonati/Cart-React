import React, { useContext, useEffect, useReducer } from "react";

import { AppContext as AppContextT, CartState, Phone } from "../entities/entities";

import reducer from "./reducer";

const API_PHONES = "/react-useReducer-cart-project";

const initialState: CartState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

export const AppContext = React.createContext<AppContextT | null>(null);

export const AppProvider = ({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart?: Phone[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = (): void => {
    dispatch({ type: "CLEAR_CART" });
  };

  const clearItem = (id: number): void => {
    dispatch({ type: "CLEAR_ITEM", payload: { id: id } });
  };

  const increaseItem = (id: number): void => {
    dispatch({ type: "INCREASE_ITEM", payload: { id: id } });
  };

  const decreaseItem = (id: number): void => {
    dispatch({ type: "DECREASE_ITEM", payload: { id: id } });
  };

  const displayItems = (cart: Phone[]): void => {
    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: cart } });
  };

  const setTotalAndAmount = (): void => {
    dispatch({ type: "SET_TOTALS_AND_AMOUNT" });
  };

  const setLoading = (): void => {
    dispatch({ type: "LOADING" });
  };

  const fetchCart = async (): Promise<void> => {
    setLoading();

    const response = await fetch(API_PHONES);

    const cart: Phone[] = await response.json();

    displayItems(cart);
  };

  useEffect(() => {
    if (initialCart) return displayItems(initialCart);

    fetchCart();
  }, [initialCart]);

  useEffect(() => {
    setTotalAndAmount();
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        loading: state.loading,
        cart: state.cart,
        total: state.total,
        amount: state.amount,
        clearCart: clearCart,
        clearItem: clearItem,
        increaseItem: increaseItem,
        decreaseItem: decreaseItem,
        displayItems: displayItems,
        setLoading: setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextT => {
  return useContext(AppContext)!;
};
