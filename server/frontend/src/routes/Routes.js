// src/routes/Routes.js
import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import App from '../containers/App/App';
import Home from '../containers/Home/Home';
import Login from '../containers/Login/Login';
import Register from '../containers/Register/Register';
import ViewAccount from '../containers/ViewAccount/ViewAccount';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="view_accounts" component={ViewAccount} />
    </Route>
  </Router>
);

export default Routes;
