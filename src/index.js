import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./Store/ConfigureStore";

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
