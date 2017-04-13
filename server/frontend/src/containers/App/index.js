// src/containers/App
import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import {  Navbar,
          Nav,
          NavItem
        } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = SocketIOClient(location.origin);
    this.sendMessage = this.sendMessage.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  sendMessage() {
    this.socket.emit('hello', 'Hello from application');
    console.log('Sending a message to the server');
    this.socket.on('reply', (message)=>{
      console.log('Received the following messge from server: ' + message);
    });
  }

  registerUser(){
    var vInt = 1;

    var data ={
      client: "Admin",
      username: "alex",
      password: "abcdefg",
      userID: 68888888,
      firstName: "New",
      lastName: "Name",
      email: "newname@gmail.com",
      phone: 3874635235,
      gotPermit: true,
      permitType: "Faculty",
      purchaseDate: "4-3-2017",
      expDate: "4-3-2018",
      type: "Faculty",
      vehicleInt: vInt,
      v1_make: "Honda",
      v1_model: "Civic",
      v1_color: "Blue",
      v1_plate: "licensePlate",
      v2_make: "Honda",
      v2_model: "Civic",
      v2_color: "Red",
      v2_plate: "licensePlate2",
    };

    if(vInt===1){
      data.v2_make = null;
      data.v2_model = null;
      data.v2_color = null;
      data.v2_licensePlate = null;
    }

    this.socket.emit('client', data);
    console.log('Sent data to server');
  }


  logout() {
    this.props.route.auth.logout();
    this.context.router.push('/login');
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    let navItem = null;
    if (this.props.route.auth.loggedIn()) {
      navItem = <IndexLinkContainer to="/login" onClick={this.logout.bind(this)}><NavItem eventKey={4}>Log out</NavItem></IndexLinkContainer>
    }
    else {
      navItem = <IndexLinkContainer to="/login"><NavItem eventKey={4}>Click SPOTS to log in</NavItem></IndexLinkContainer>;
    }

    return (
      <div className="App">
        <div className="App-nav">
          <Navbar>
              <Navbar.Header>
                  <Navbar.Brand>
                      <a href="#/home">Administrator</a>
                  </Navbar.Brand>
              </Navbar.Header>
              <Nav pullRight>
                  <IndexLinkContainer to="/register">
                    <NavItem
                      eventKey={1}>
                      Register
                    </NavItem>
                  </IndexLinkContainer>

                  <IndexLinkContainer to="/view_accounts">
                    <NavItem
                      eventKey={2}>
                      View Payments and Fines
                    </NavItem>
                  </IndexLinkContainer>

                  <IndexLinkContainer to="/monitor_spots">
                    <NavItem
                      eventKey={3}>
                      Monitor Spots
                    </NavItem>
                  </IndexLinkContainer>

                  {navItem}
              </Nav>
          </Navbar>
        </div>
        <br/>
        <div className="App-content">
          {children}
        </div>

      </div>
    );
  }
}

export default App;
