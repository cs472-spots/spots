import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from '../assets/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:3000');
    this.sendMessage = this.sendMessage.bind(this);
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
                <button
                        onClick={this.sendMessage}>
                        Send Message
                </button>

      </div>
    );
  }

        /* //Performing an API Request
                //www.raywenderlich.com/126063/react-native-tutorial
        */

        }



export default App;
