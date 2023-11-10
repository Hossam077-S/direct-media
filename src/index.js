import React from 'react';
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import './index.css';

import { FirestoreProvider } from './Utils/FirestoreContext2';
// import RootComponent from './RootComponent';


// const APP = (  
// <Router>
//   {/* <RootComponent> */}
//     <FirestoreProvider>
//       <App /> 
//     </FirestoreProvider>
//   {/* </RootComponent> */}
// </Router>)

const APP = (
  <Router>
    <FirestoreProvider>
      <App />
    </FirestoreProvider>
  </Router>
);

 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}