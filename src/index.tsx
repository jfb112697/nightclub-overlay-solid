/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { StateProvider } from "./Context/StateContext";
import { Game } from "./Pages/Game/Game";
import "solid-devtools";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

render(
  () => (
    <StateProvider>
      <Router>
        <Route path="/" component={Game} />
      </Router>
    </StateProvider>
  ),
  root
);
