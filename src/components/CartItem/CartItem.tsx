import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { useGlobalContext } from "../../context/context";

import "./CartItem.css";

interface CartItemProps {
  id: number;
}

export const CartItem = ({ id }: CartItemProps): JSX.Element => {
  const { cart, clearItem, increaseItem, decreaseItem } = useGlobalContext();

  const item = cart.find((cartItem) => cartItem.id === id);

  return (
    <div className="item">
      <div className="item__img-wrapper">
        <img className="item__img" src={item?.img} alt={item?.title}></img>
      </div>

      <div className="item__information">
        <h3 className="item__title">{item?.title}</h3>
        <p className="item__price">${item?.price}</p>
        <button
          type="button"
          className="item__remove"
          aria-label="remove"
          onClick={() => clearItem(id)}
        >
          Remove
        </button>
      </div>

      <div className="item__amount">
        <button
          type="button"
          aria-label="increase phone"
          className="item__increase"
          onClick={() => increaseItem(id)}
        >
          <BsChevronUp
            id="cart-up"
            className="item__increase-icon"
          ></BsChevronUp>
        </button>
        <p className="item__amount-text">{item?.amount}</p>
        <button
          type="button"
          aria-label="decrease phone"
          className="item__decrease"
          onClick={() => decreaseItem(id)}
        >
          <BsChevronDown
            id="cart-down"
            className="item__decrease-icon"
          ></BsChevronDown>
        </button>
      </div>
    </div>
  );
};
