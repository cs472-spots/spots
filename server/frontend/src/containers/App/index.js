// src/containers/App
import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import {  Navbar,
          Nav,
          NavItem
        } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

import HeaderBar from '../../components/HeaderBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {sidebarOpen: true};
    this.handleViewSidebar = this.handleViewSidebar.bind(this);
    this.socket = SocketIOClient(location.origin);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    this.socket.emit('hello', 'Hello from application');
    console.log('Sending a message to the server');
    this.socket.on('reply', (message)=>{
      console.log('Received the following messge from server: ' + message);
    });
  }

  logout() {
    this.props.route.auth.logout();
    this.context.router.push('/login');
  }

  handleViewSidebar() {
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    var contentClass= this.state.sidebarOpen ? 'content open' : 'content';

    return (
      <div className="App">
        <HeaderBar onClick={this.handleViewSidebar}/>
        {
          //<SideBar isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar}/>
        }
        <SideBar onClick={this.logout.bind(this)} isOpen={this.state.sidebarOpen}/>
        <div className={contentClass}>
          {children}
        </div>
      </div>
    );
  }
}

export default App;
