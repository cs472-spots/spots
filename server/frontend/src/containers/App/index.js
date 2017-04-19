// src/containers/App
import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'nectarine';

import HeaderBar from '../../components/HeaderBar';
import SideBar from '../../components/SideBar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {sidebarOpen: true};
    this.handleViewSidebar = this.handleViewSidebar.bind(this);
    this.socket = SocketIOClient(location.origin);
    this.sendMessage = this.sendMessage.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
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

//Functions

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

  registerUser(){
    var vInt = 1;

    var data ={
      client: "Admin",
      username: "blargh",
      password: "abcdefg",
      userID: 77777777,
      cardID: 987654321,
      firstName: "Mipp",
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

  deleteUser() {
    var data ={
      client: "Admin",
      flag: "delete",
      userID: 68888888
    };

    this.socket.emit('client', data);
    console.log('Telling server to delete user ' + data.userID);
  }

  viewUser(){
    console.log('Requested tor view a user');
    var data = {
      client: "Admin",
      flag: "viewUser",
      userID: 68888888
    }

    this.socket.emit('client', data);
    this.socket.on('userInfo', (info)=>{
      console.log('Listening for info');
      console.log(info);
    });
  }

        /* //Performing an API Request
                //www.raywenderlich.com/126063/react-native-tutorial
        */
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: App,
  mapProps
});
