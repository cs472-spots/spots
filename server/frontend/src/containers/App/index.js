// src/containers/App
import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'nectarine';

import HeaderBar from '../../components/HeaderBar';
import SideBar from '../../components/SideBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      profile: this.props.route.auth.getProfile()
    };
    this.props.route.auth.on ('profile_updated', (newProfile) => {
      this.setState ({profile: newProfile});
    });
    this.handleViewSidebar = this.handleViewSidebar.bind(this);
  }

  //Other Functions
  logout() {
    this.props.route.auth.logout();
    this.context.router.push('/login');
  }

  handleViewSidebar() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }


  componentWillMount () {
      this.props.setSocket(SocketIOClient(location.origin));
      document.body.style.background = "#222d32";
  }

  componentWillUnmount () {
      document.body.style.background = null;
  }

  //Render Function
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, //sends auth instance from route to children
      })
    }

    const { profile } = this.state;
    var contentClass=this.state.sidebarOpen ? 'content open' : 'content';

    return (
      <div className="App">
        <HeaderBar onClick={this.handleViewSidebar} profile={profile}/>
        {
          //<SideBar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar}/>
        }
        <SideBar onClick={this.logout.bind(this)} isOpen={this.props.route.auth.loggedIn() ? this.state.sidebarOpen : false} profile={profile}/>
        <div className={this.props.route.auth.loggedIn() ? contentClass : 'content'}>
          {children}
        </div>
      </div>

    );
  }
}

const mapProps = (store, ownProps) => {
  return {
    setSocket: (socket) => store.sessionSlice.socket.$set(socket)
  }
}

export default connect({
  component: App,
  mapProps
});
