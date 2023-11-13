import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import "./index.css";

import { FirestoreProvider } from "./Utils/FirestoreContext2";
import { HelmetProvider } from "react-helmet-async";
// import RootComponent from './RootComponent';

ReactDOM.render(
  <Router>
    {/* <RootComponent> */}
    <HelmetProvider>
      <FirestoreProvider>
        <App />
      </FirestoreProvider>
    </HelmetProvider>
    {/* </RootComponent> */}
  </Router>,
  document.getElementById("root")
);
