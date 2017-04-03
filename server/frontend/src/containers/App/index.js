// src/containers/App
import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';

class App extends Component {
  
  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
      	<div className="content">
          <h2>Hello from App</h2>
		    </div>
	    </div>
    );
  }
}

export default App;
