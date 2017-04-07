//src/containers/Login/index.js
import React, { Component, PropTypes as T } from 'react';
import AuthService from '../../utils/AuthService';

import logo from './../../assets/logo.png';

import { FormControl,
         Form,
         FormGroup,
         Col,
         ControlLabel,
         Grid,
         Button,
         Panel
       } from 'react-bootstrap';

import './Login.css';

class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf (AuthService)
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="Login-Class">
        <div className="Login-Header">
          <img src={logo} onClick={auth.login.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Login;
