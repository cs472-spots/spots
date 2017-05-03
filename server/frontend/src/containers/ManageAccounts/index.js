import React, { Component } from 'react';
import update from 'immutability-helper';
import { connect } from 'nectarine';

import ManageForm from '../../components/ManageForm/manageForm.js';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SearchBar from '../../components/SearchForm/searchBar.js';
/* eslint-disable */


class ManageAccounts extends Component {
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

	handleSearch = (event) => {
    event.preventDefault();
    this.viewUser();
  }

	userChange = (event) => {
		event.preventDefault();
    const value = event.target.value
    const name = event.target.name;
		console.log (name);
		this.setState ({
			info: update(this.state.info, { [name]: {$set: value}})
		})
	}

	handleSubmit = (event) => {
		var confirmChange = confirm('Are these changes okay? \n\n' +
		'NSHE: ' + this.state.info.userID + '\n' +
		'Name: ' + this.state.info.firstName + ' ' + this.state.info.lastName + '\n' +
		'Email: ' + this.state.info.email + '\n' +
		'Phone Number: ' + this.state.info.phone + '\n\n' +
		'Vehicle Information' + '\n' +
		'Make: ' + this.state.info.v1_make + '\n' +
		'Model: ' + this.state.info.v1_model + '\n' +
		'Color: ' + this.state.info.v1_color + '\n' +
		'License: ' + this.state.info.v1_plate + '\n\n' +
		'Card ID#: ' + this.state.info.cardid + '\n' +
		'Permit Type: ' + this.state.info.permitType)

		if (confirmChange) {
			this.registerUser();
			alert('Sucessfully Updated!')
		}
		else {

		}
		event.preventDefault();
	}

	registerUser(){
    var vInt = 1;

    var data ={
      client: "Admin",
      userID: parseInt(this.state.info.userID),
      cardID: parseInt(this.state.info.cardid),
      firstName: this.state.info.firstName,
      lastName: this.state.info.lastName,
      email: this.state.info.email,
      phone: parseInt(this.state.info.phone),
			gotPermit: true,
      permitType: this.state.info.permitType,
			purchaseDate: this.state.info.purchaseDate,
			expDate: this.state.info.expDate,
      type: this.state.info.permitType,
      vehicleInt: vInt,
      v1_make: this.state.info.v1_make,
      v1_model: this.state.info.v1_model,
      v1_color: this.state.info.v1_color,
      v1_plate: this.state.info.v1_plate,
      flag: "register"
    };

    if(vInt===1){
      data.v2_year = null;
      data.v2_make = null;
      data.v2_model = null;
      data.v2_color = null;
      data.v2_plate = null;
    }

    this.props.sessionSocket.emit('client', data);
    console.log('Sent data to server');
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
			if (info === null) {
				alert ('User does not exist!');
			}
			else {
				this.setState({info: info});
			}
    });
  }

	//Render Function
	render () {
		return (
			<div>
				<SearchHeader activeName={this.props.pageName} description={this.props.pgDescription}/>
				<SearchBar search={this.state.search} onClick={this.handleSearch} handleChange={this.handleChange} />
				<ManageForm info={this.state.info} userChange={this.userChange}/>
				<div className="col-md-16">
					<div className="box box-office-use">
						<button className="form-control" onClick={this.handleSubmit}>Submit</button>
					</div>
				</div>
			</div>
		);
	}
}

ManageAccounts.defaultProps = {
	pageName: "Manage Accounts",
	pgDescription: "Staff and Students"
};

const mapProps = (store) => {
  return {
		//stores sessionSocket as value at firstName in sessionSlice
		sessionSocket: store.sessionSlice.socket.$get()
	}
}

export default connect({
  component: ManageAccounts,
  mapProps
});
