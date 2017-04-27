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

			pageName: "View Accounts",
			pgDescription: "Staff and Students",
			search: ''
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

	render () {
		const { sessionSocket }=this.props;
		const { pageName, pgDescription }=this.state;
		console.log (this.props)

		return (
			<div>
				<SearchHeader activeName={pageName} description={pgDescription} />
				<SearchBar search={this.state.search} onClick={this.handleSubmit} handleChange={this.handleChange} />
				<SearchForm />
			</div>
		);
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
      alert(info);
    });
  }

	//Render Function
	render () {
		const { pageName, pgDescription }=this.state;
		console.log (this.props)

		return (
			<div>
				<SearchHeader activeName={pageName} description={pgDescription} />
				<SearchBar search={this.state.search} onClick={this.handleSubmit} handleChange={this.handleChange} />
				<SearchForm />
			</div>
		);
	}

}

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
