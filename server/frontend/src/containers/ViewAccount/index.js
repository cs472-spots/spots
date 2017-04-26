import React, { Component } from 'react';
import { connect } from 'nectarine';

import SearchForm from '../../components/SearchForm/searchForm.js';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SearchBar from '../../components/SearchForm/searchBar.js';


class ViewAccount extends Component {
	constructor (props) {
		super(props);
		this.state = {
			pageName: "View Payments & Fees",
			pgDescription: "Staff and Students"
		};
		this.viewUser= this.viewUser.bind(this);
	}

	render () {
		const { sessionSocket } = this.props;
		const { pageName, pgDescription } = this.state;
		console.log (this.props)
		//sessionSocket.on ('connect', () => {console.log(sessionSocket.id)})

		return (
			<div>
				<SearchHeader activeName = {pageName} description = {pgDescription} />
				<SearchBar />
				<SearchForm />
			</div>
		);
	}

	viewUser(socket){
    console.log('Requested tor view a user');
    var data = {
      client: "Admin",
      flag: "viewUser",
      userID: 68888888
    }

    socket.emit('client', data);
    socket.on('userInfo', (info)=>{
      console.log('Listening for info');
      console.log(info);
    });
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
