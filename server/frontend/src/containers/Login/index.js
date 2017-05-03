//src/containers/Login/index.js
import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'nectarine';

import SpotsMap from '../../components/SpotsMap';
import AuthService from '../../utils/AuthService';

class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf (AuthService)
  }

  render() {
    const { auth } = this.props;
    auth.lock.show();
    return (
      <SpotsMap/>
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
