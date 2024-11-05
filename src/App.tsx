import { Fragment } from "react";

import { CartContainer } from "./components/CartContainer/CartContainer";
import { Navbar } from "./components/Navbar/Navbar";

import { useGlobalContext } from "./context/context";

import "./App.css";

export function App(): JSX.Element {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <main>
        <section className="cart_container_title">
          <h2>Loading...</h2>
        </section>
      </main>
    );
  }

  return (
    <Fragment>
      <header>
        <Navbar></Navbar>
      </header>

      <main>
        <CartContainer></CartContainer>
      </main>
    </Fragment>
  );
}
