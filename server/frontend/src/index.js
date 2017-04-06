// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'nectarine';
import { browserHistory } from 'react-router';
// eslint-disable-next-line
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import store from './store';
import Routes from './routes/index.js';

//Renders the components passed by
ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
