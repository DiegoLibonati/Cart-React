import React, { useContext, useEffect, useReducer } from "react";
import { AppContextT, CartState, Phone } from "../entities/entities";
import reducer from "./reducer";
import { phones } from "../constants/data";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState: CartState = {
  loading: false,
  cart: phones,
  total: 0,
  amount: 0,
};

export const AppContext = React.createContext<AppContextT | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
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

  const fetchData = async (): Promise<void> => {
    dispatch({ type: "LOADING" });

    const response = await fetch(url);
    const cart: Phone[] = await response.json();

    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: cart } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        loading: state.loading,
        cart: state.cart,
        total: state.total,
        amount: state.amount,
        clearCart,
        clearItem,
        increaseItem,
        decreaseItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextT => {
  return useContext(AppContext)!;
};
