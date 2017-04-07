// src/containers/Register/index.js

import React, { Component } from 'react';
import classnames from 'classnames';

class Register extends Component {

  render () {
    const { className, ...props } = this.props;
    return (
      <div className="Register">
        <h1> Hello from REgister </h1>
      </div>
    );
  }
}

export default Register;
