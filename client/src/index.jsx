import React from "react";
import "./index.css";
import ReactDOM from "react-dom";

import AppWrapper from "./AppWrapper";
import App from "./App";
import { LoginContextProvider } from "./components/Context/LoginContext";

ReactDOM.render(
  <LoginContextProvider>
    <AppWrapper>
      <App />
    </AppWrapper>
  </LoginContextProvider>,
  document.getElementById("root")
);
