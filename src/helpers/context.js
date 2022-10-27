import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "./reducer.js";
import { phones } from "./data.js";

const url = "https://course-api.com/react-useReducer-cart-project";

export const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: phones,
  total: 0,
  amount: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const clearItem = (id) => {
    dispatch({ type: "CLEAR_ITEM", payload: id });
  };

  const increaseItem = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };

  const decreaseItem = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, clearItem, increaseItem, decreaseItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
