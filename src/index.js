import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import './index.css';

import { FirestoreProvider } from './Utils/FirestoreContext2';
// import RootComponent from './RootComponent';

ReactDOM.render( 
  <Router>
    {/* <RootComponent> */}
      <FirestoreProvider>
        <App /> 
      </FirestoreProvider>
    {/* </RootComponent> */}
  </Router>,
  document.getElementById('root')
);