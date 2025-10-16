import { CartItem } from "@src/components/CartItem/CartItem";

import { useCartContext } from "@src/hooks/useCartContext";

import "@src/components/CartContainer/CartContainer.css";

export const CartContainer = (): JSX.Element => {
  const { state, dispatch } = useCartContext();

  if (state.cart.length === 0) {
    return (
      <section className="cart">
        <article className="cart__header">
          <h2 className="cart__title">Your bag</h2>
          <h4 className="cart__description">Is currently empty</h4>
        </article>
      </section>
    );
  }

  return (
    <section className="cart">
      <article className="cart__header">
        <h2 className="cart__title">Your bag</h2>
      </article>

      <article className="cart__items">
        {state.cart.map((item) => {
          return <CartItem key={item.id} id={item.id}></CartItem>;
        })}
      </article>

      <article className="cart__total">
        <div className="cart__price">
          <h3 className="cart__price-title">Total</h3>
          <p className="cart__price-number">$ {state.total.toFixed(2)}</p>
        </div>

        <button
          type="button"
          aria-label="clear cart"
          className="cart__clear-cart"
          onClick={() => dispatch({ type: "CLEAR_CART" })}
        >
          CLEAR CART
        </button>
      </article>
    </section>
  );
};
