// src/containers/Register/index.js

import React, { Component } from 'react';
import classnames from 'classnames';

class Register extends Component {
	render () {
		const { className, ...props } = this.props;
		
		return (
			<div className={classnames('Register', className)} {...props}>
				<h2>Hello from Register!</h2>
			</div>
		);
	}
}

export default Register;
