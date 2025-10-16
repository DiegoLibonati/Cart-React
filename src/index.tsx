import ReactDOM from "react-dom/client";

import { App } from "@src/App";

import { CartProvider } from "@src/contexts/CartContext/CartContext";

import "@src/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CartProvider>
    <App></App>
  </CartProvider>
);
