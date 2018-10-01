import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import store from "./state/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
