import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useGlobalContext } from "../helpers/context";

export const CartItem = ({ id, title, price, img, amount }) => {
  const { clearItem, increaseItem, decreaseItem } = useGlobalContext();

  return (
    <div className="cart_item">
      <div className="cart_item_img">
        <img className="cart_item_img_img" src={img} alt={title}></img>
      </div>

      <div className="cart_item_information">
        <h3>{title}</h3>
        <p>${price}</p>
        <button type="button" onClick={() => clearItem(id)}>
          Remove
        </button>
      </div>

      <div className="cart_item_amount">
        <BsChevronUp
          id="cart-up"
          onClick={() => increaseItem(id)}
        ></BsChevronUp>
        <p>{amount}</p>
        <BsChevronDown
          id="cart-down"
          onClick={() => decreaseItem(id)}
        ></BsChevronDown>
      </div>
    </div>
  );
};
