import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import logo from './assets/logo.svg';
import './containers/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = SocketIOClient('http://localhost:3000');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Spots</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/containers/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
