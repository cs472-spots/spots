import React, { Component } from 'react';
import classnames from 'classnames';

class ViewAccount extends Component {
	render () {
    	const { className, ...props } = this.props;

		return (
			<div className={classnames('Login', className)} {...props}>
				<h1>Hello from viewing accounts</h1>
			</div>
		);
	}
}

export default ViewAccount;