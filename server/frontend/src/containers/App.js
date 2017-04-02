import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from '../assets/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('http://localhost:3000');
    this.keyPressEvent = this.keyPressEvent.bind(this);
  }

        keyPressEvent() {
          /**test to send out Object--not yet working
           var name = 'Alex';
           var nsheid = 300;
           var permit = 'Student';
           var data = {
              Name: name,
              NSHE: nsheid,
              Permit: permit
           };
         **/

          this.socket.emit('hello', 'Hello from application');
          this.socket.on('message', (message)=>{
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
                        onClick={this.keyPressEvent}>
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
