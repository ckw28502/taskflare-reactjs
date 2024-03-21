import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./tools/i18n";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
);
