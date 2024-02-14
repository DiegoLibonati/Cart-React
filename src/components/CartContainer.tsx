import React from "react";
import { CartItem } from "./CartItem";
import "../CartContainer.css";
import { useGlobalContext } from "../context/context";

export const CartContainer = (): JSX.Element => {
  const { cart, total, clearCart } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart_container">
        <article className="cart_container_title">
          <h2>Your bag</h2>
          <h4>Is currently empty</h4>
        </article>
      </section>
    );
  }
  
  return (
    <section className="cart_container">
      <article className="cart_container_title">
        <h2>Your bag</h2>
      </article>

      <article className="cart_container_items">
        {cart.map((item) => {
          return <CartItem key={item.id} {...item}></CartItem>;
        })}
      </article>

      <article className="cart_container_total">
        <div className="cart_container_total_price">
          <h3>Total</h3>
          <p>$ {total}</p>
        </div>

        <button type="button" onClick={() => clearCart()}>
          CLEAR CART
        </button>
      </article>
    </section>
  );
};
