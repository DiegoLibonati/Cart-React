import { Fragment } from "react";

import { CartContainer } from "./components/CartContainer/CartContainer";
import { Navbar } from "./components/Navbar/Navbar";

import { useGlobalContext } from "./context/context";

import "./App.css";
import "./AppLoading.css";

export function App(): JSX.Element {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <main className="main-loading main-app">
        <section className="main-loading__header">
          <h2 className="main-loading__title">Loading...</h2>
        </section>
      </main>
    );
  }

  return (
    <Fragment>
      <Navbar></Navbar>

      <main className="main-cart main-app">
        <CartContainer></CartContainer>
      </main>
    </Fragment>
  );
}
