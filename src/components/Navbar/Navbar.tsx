import { BsFillCartFill } from "react-icons/bs";

import { useGlobalContext } from "../../context/context";

import "./Navbar.css";

export const Navbar = (): JSX.Element => {
  const { amount } = useGlobalContext();

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <h3 className="navbar__title">UseReducer</h3>

        <div className="navbar__shop">
          <BsFillCartFill
            id="cart"
            className="navbar__shop-icon"
          ></BsFillCartFill>
          <div className="navbar__amount">
            <p className="navbar__amount-text">{amount}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};
