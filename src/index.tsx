import ReactDOM from "react-dom/client";

import { App } from "@src/App";

import { AppProvider } from "@src/context/context";

import "@src/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppProvider>
    <App></App>
  </AppProvider>
);
