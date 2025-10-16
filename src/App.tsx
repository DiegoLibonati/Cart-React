import { Fragment } from "react";

import { Navbar } from "@src/components/Navbar/Navbar";

import { CartPage } from "@src/pages/CartPage/CartPage";

import "@src/App.css";

export function App(): JSX.Element {
  return (
    <Fragment>
      <Navbar></Navbar>
      <CartPage></CartPage>
    </Fragment>
  );
}
