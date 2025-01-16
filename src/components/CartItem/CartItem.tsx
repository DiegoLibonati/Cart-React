import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { useGlobalContext } from "../../context/context";

interface CartItemProps {
  id: number;
}

export const CartItem = ({ id }: CartItemProps): JSX.Element => {
  const { cart, clearItem, increaseItem, decreaseItem } = useGlobalContext();

  const item = cart.find((cartItem) => cartItem.id === id);

  return (
    <div className="cart__item">
      <div className="cart__item__img">
        <img
          src={item?.img}
          alt={item?.title}
        ></img>
      </div>

      <div className="cart__item__information">
        <h3>{item?.title}</h3>
        <p>${item?.price}</p>
        <button type="button" aria-label="remove" onClick={() => clearItem(id)}>
          Remove
        </button>
      </div>

      <div className="cart__item__amount">
        <button
          type="button"
          aria-label="increase phone"
          onClick={() => increaseItem(id)}
        >
          <BsChevronUp id="cart-up"></BsChevronUp>
        </button>
        <p>{item?.amount}</p>
        <button
          type="button"
          aria-label="decrease phone"
          onClick={() => decreaseItem(id)}
        >
          <BsChevronDown id="cart-down"></BsChevronDown>
        </button>
      </div>
    </div>
  );
};
