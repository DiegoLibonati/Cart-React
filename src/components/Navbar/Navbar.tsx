import { BsFillCartFill } from "react-icons/bs";

import { useGlobalContext } from "../../context/context";

import "./Navbar.css";

export const Navbar = (): JSX.Element => {
  const { amount } = useGlobalContext();

  return (
    <nav className="navbar">
      <h3>UseReducer</h3>

      <div className="navbar__shop">
        <BsFillCartFill id="cart"></BsFillCartFill>
        <div className="navbar__amount">
          <p>{amount}</p>
        </div>
      </div>
    </nav>
  );
};
