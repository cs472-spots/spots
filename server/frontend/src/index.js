// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'nectarine';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import Store from './store/Store.js';
import Routes from './routes/Routes.js';

import './index.css';
//Renders the components passed by 
ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>
  document.getElementById('root')
);
