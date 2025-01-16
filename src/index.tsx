import ReactDOM from "react-dom/client";

import { App } from "./App";

import { AppProvider } from "./context/context";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppProvider>
    <App></App>
  </AppProvider>
);
