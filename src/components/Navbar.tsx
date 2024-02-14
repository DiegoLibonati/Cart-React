import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useGlobalContext } from "../context/context";
import "../Navbar.css";

export const Navbar = (): JSX.Element => {
  const { amount } = useGlobalContext();

  return (
    <nav className="nav_container">
      <h3>UseReducer</h3>

      <div className="nav_container_shop">
        <BsFillCartFill id="cart"></BsFillCartFill>
        <div className="amount-container">
          <p>{amount}</p>
        </div>
      </div>
    </nav>
  );
};
