//src/containers/Login/index.js
import React, { Component, PropTypes as T } from 'react';
import AuthService from '../../utils/AuthService';

import logo from './../../assets/logo.png';

class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf (AuthService)
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="content">
        <div className="Login-Header">
          <img role="presentation" src={logo} onClick={auth.login.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Login;
