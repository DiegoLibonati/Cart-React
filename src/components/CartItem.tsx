import { CartItemProps } from "../entities/entities";

import { useGlobalContext } from "../context/context";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export const CartItem = ({ id }: CartItemProps): JSX.Element => {
  const { cart, clearItem, increaseItem, decreaseItem } = useGlobalContext();

  const item = cart.find((cartItem) => cartItem.id === id);

  return (
    <div className="cart_item">
      <div className="cart_item_img">
        <img
          className="cart_item_img_img"
          src={item?.img}
          alt={item?.title}
        ></img>
      </div>

      <div className="cart_item_information">
        <h3>{item?.title}</h3>
        <p>${item?.price}</p>
        <button type="button" onClick={() => clearItem(id)}>
          Remove
        </button>
      </div>

      <div className="cart_item_amount">
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
