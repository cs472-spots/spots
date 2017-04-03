// src/routes/index.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import Login from '../containers/Login';
import Register from '../containers/Register';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
  </Router>
);

export default Routes;