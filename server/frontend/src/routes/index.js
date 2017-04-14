
// src/routes/Routes.js
import React from 'react';
import { Router,
         Route,
         IndexRedirect } from 'react-router';

import App from '../containers/App';
import Error404 from '../containers/Error404';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import ViewAccount from '../containers/ViewAccount';

import AuthService from '../utils/AuthService'

const auth = new AuthService('XEtMLkSEfZPviZEEkj3uWw1itw0W5nYy', 'nhand2.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Routes = () => (
  <Router>
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="login" component={Login} />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="register" component={Register} onEnter={requireAuth}/>
      <Route path="view_accounts" component={ViewAccount} onEnter={requireAuth}/>
      <Route path="monitor_spots" component={Error404} onEnter={requireAuth}/>
    </Route>
  </Router>
);

export default Routes;
