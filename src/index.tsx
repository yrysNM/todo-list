import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import { App } from "./components/App";

import "./styles/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);
