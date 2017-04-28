//src/containers/Login/index.js
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'nectarine';

import AuthService from '../../utils/AuthService';
import logo from './../../assets/logo.png';

class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf (AuthService)
  }

  render() {
    const { auth } = this.props;
    auth.lock.show();
    return (
      <div>
        <div>
          <img role="presentation" src={logo}/>
        </div>
      </div>
    );
  }
}


const mapProps = (store) => {
  return {
  }
}

export default connect({
  component: Login,
  mapProps
});
