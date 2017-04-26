//src/containers/Login/index.js
import React, { Component, PropTypes as T } from 'react';
import SocketIOClient from 'socket.io-client'
import { connect } from 'nectarine';

import AuthService from '../../utils/AuthService';
import logo from './../../assets/logo.png';

class Login extends Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf (AuthService)
  }

  constructor (props) {
		super(props);
		this.props.setSocket(SocketIOClient(location.origin));
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
    //States resets after refresh
    setSocket: (socket) => store.sessionSlice.socket.$set(socket)
  }
}

export default connect({
  component: Login,
  mapProps
});
