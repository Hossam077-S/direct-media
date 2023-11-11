import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import { FirestoreProvider } from "./Utils/FirestoreContext2";

// import RootComponent from './RootComponent';

import App from "./App";

import "./index.css";

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
