import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from '../assets/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:3000');
    this.sendMessage = this.sendMessage.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  sendMessage() {
    this.socket.emit('hello', 'Hello from application');
    console.log('Sending a message to the server');
    this.socket.on('reply', (message)=>{
      console.log('Received the following messge from server: ' + message);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={this.sendMessage}>
            Send Message
        </button>

        <button onClick={this.registerUser}>
            Register a User
        </button>

        <button onClick={this.deleteUser}>
            Delete a User
        </button>
      </div>
    );
  }

  registerUser(){
    var vInt = 1;

    var data ={
      client: "Admin",
      flag: "register",
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

  deleteUser() {
    var data ={
      client: "Admin",
      flag: "delete",
      userID: 68888888,
    };

    this.socket.emit('client', data);
    console.log('Telling server to delete user ' + data.userID);
  }

        /* //Performing an API Request
                //www.raywenderlich.com/126063/react-native-tutorial
        */
}



export default App;
