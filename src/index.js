import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <App /> 
      </QueryClientProvider>
    </Router>,
    document.getElementById('root')
  );