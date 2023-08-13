import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import './index.css';

import { FirestoreProvider } from './Utils/FirestoreContext';

ReactDOM.render( 
  <Router>
    <FirestoreProvider>
      <App /> 
    </FirestoreProvider>
  </Router>,
  document.getElementById('root')
);