import React, { Component } from 'react';
import { connect } from 'nectarine';

import SearchForm from '../../components/SearchForm/searchForm.js';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SearchBar from '../../components/SearchForm/searchBar.js';
/* eslint-disable */


class ViewAccount extends Component {
	constructor (props) {
		super(props);
		this.state = {
			search: '',
			info: ''
		};
		this.viewUser= this.viewUser.bind(this);
	}


	handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    this.setState({
      search: value
    });
  }

	handleSubmit = (event) => {
    event.preventDefault();
    this.viewUser();
  }


	viewUser(){
    console.log('Requested to view a user');
    var data = {
      client: "Admin",
      flag: "viewUser",
      userID: parseInt(this.state.search)
    }

  	this.props.sessionSocket.emit('client', data);
    this.props.sessionSocket.on('userInfo', (info)=>{
      console.log('Listening for info');
      console.log(info);
			this.setState({info: info});
    });
  }

	//Render Function
	render () {
		return (
			<div>
				<SearchHeader activeName={this.props.pageName} description={this.props.pgDescription} />
				<SearchBar search={this.state.search} onClick={this.handleSubmit} handleChange={this.handleChange} />
				<SearchForm info={this.state.info} />
			</div>
		);
	}
}

ViewAccount.defaultProps = {
	pageName: "View Accounts",
	pgDescription: "Staff and Students"
};

const mapProps = (store) => {
  return {
		//stores sessionSocket as value at firstName in sessionSlice
		sessionSocket: store.sessionSlice.socket.$get()
	}
}

export default connect({
  component: ViewAccount,
  mapProps
});
