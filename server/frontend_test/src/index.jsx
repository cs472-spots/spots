import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import reducer from './reducer';
import App from './components/App';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import Login from './components/Login';
import Welcome from './components/Welcome';
import AboutUs from './components/AboutUs';

const routes = <Route component = {App}>
  <Route path = "/" component = {Welcome} />
  <Route path = "/login" component = {Login} />
  <Route path = "/aboutus" component = {AboutUs} />
</Route>;

ReactDOM.render (
  <Router history = {hashHistory}>{routes}</Router>,
  document.getElementById('app')
);