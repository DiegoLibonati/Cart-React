import { useEffect } from "react";

import { CartContainer } from "@src/components/CartContainer/CartContainer";
import { Loading } from "@src/components/Loading/Loading";

import { useCartContext } from "@src/hooks/useCartContext";

import { getPhones } from "@src/api/get/getPhones";

import "@src/pages/CartPage/CartPage.css";

export const CartPage = () => {
  const { state, dispatch } = useCartContext();

  const fetchCart = async (): Promise<void> => {
    dispatch({ type: "LOADING" });

    const phones = await getPhones();

    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: phones } });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_TOTALS_AND_AMOUNT" });
  }, [state.cart]);

  if (state.loading) return <Loading></Loading>;

  return (
    <main className="cart-page main-app">
      <CartContainer></CartContainer>
    </main>
  );
};
