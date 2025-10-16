import { BsFillCartFill } from "react-icons/bs";

import { useCartContext } from "@src/hooks/useCartContext";

import "@src/components/Navbar/Navbar.css";

export const Navbar = (): JSX.Element => {
  const { state } = useCartContext();

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <h3 className="navbar__title">UseReducer</h3>

        <div className="navbar__shop">
          <BsFillCartFill
            id="cart"
            className="navbar__shop-icon"
          ></BsFillCartFill>
          <div className="navbar__shop-amount">
            <p className="navbar__shop-amount-text">{state.amount}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};
