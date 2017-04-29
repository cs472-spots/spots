// src/routes/Routes.js
import React from 'react';
import { Router,
         Route,
         IndexRedirect,
         Redirect } from 'react-router';

import App from '../containers/App';
import Error404 from '../containers/Error404';
import Login from '../containers/Login';
import Maps from '../containers/Maps';
import MonitorSpots from '../containers/MonitorSpots';
import Register from '../containers/Register';
import ViewAccount from '../containers/ViewAccount';

import AuthService from '../utils/AuthService'

const auth = new AuthService('SNuRPg9JQM3P0FKkWo6VCfVE3Bvl2oIa', 'app63320791.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: 'app/login' })
  }
}

const Routes = () => (
  <Router>
    <Redirect to="/app" from="/" />
    <Route path="/app" component={App} auth={auth}>
      <IndexRedirect to="monitor_spots" />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} onEnter={requireAuth}/>
      <Route path="view_accounts" component={ViewAccount} onEnter={requireAuth}/>
      <Route path="monitor_spots" component={MonitorSpots} onEnter={requireAuth}/>
      <Route path="*" component={Error404}/>
    </Route>
    <Route path="/map" component={Maps} />
  </Router>
);

export default Routes;
