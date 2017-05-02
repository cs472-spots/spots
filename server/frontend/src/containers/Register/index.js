
import React, { Component } from 'react';
import { connect } from 'nectarine';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
/* eslint-disable */

//registration form
class Register extends Component {
  constructor(props) {
    super(props);
    var cDate = new Date();

    this.state = {
        //Account Information
        uname: '',
        cid: '',
        //Student Information
        fname: '',
        lname: '',
        NSHE:'',
        email: '',
        pnum:'',
        vColor:'',
        vYear: '',
        vLic:'',
        vMake:'',
        vModel:'',
        permitType: 'student',
        //Date
        curDate: (cDate.getMonth()+1).toString() + '-' + cDate.getDate().toString() + '-' + cDate.getFullYear().toString(),
        futDate: (cDate.getMonth()+1).toString() + '-' + cDate.getDate().toString() + '-' + (cDate.getFullYear()+1).toString()
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value
    const name = target.name;
    this.setState({
        [name]:value
    });
  }

  handleSubmit = (event) => {
      var confirmation = confirm('Is this information correct? \n\n' +
      'Username: ' + this.state.uname + '\n' +
      'Card ID: ' + parseInt(this.state.cid) + '\n' +
      'Name: '+ this.state.fname +' '+this.state.lname+'\n'+
      'NSHE: ' + parseInt(this.state.NSHE) + '\n'+
      'Email: '+ this.state.email + '\n'+
      'Phone Number: ' + parseInt(this.state.pnum) + '\n' +
      'Vehicle: ' + this.state.vColor + ' ' + this.state.vMake + ' ' + this.state.vModel + '\n'+
      'License: ' + this.state.vLic + '\n'+
      'Permit Type: ' + this.state.permitType + '\n' +
      'Current Date: ' + this.state.curDate + '\n' +
      'Expire Date: ' + this.state.futDate )

    if (confirmation) {
      this.registerUser();
      alert('User registered successfully!');
    }
    else {
      //Do nothing, allow user to fix input
    }
    event.preventDefault();
  }

  registerUser(){
    var vInt = 1;

    var data ={
      client: "Admin",
      username: this.state.uname,
      userID: parseInt(this.state.NSHE),
      cardID: parseInt(this.state.cid),
      firstName: this.state.fname,
      lastName: this.state.lname,
      email: this.state.email,
      phone: parseInt(this.state.pnum),
      gotPermit: true,
      permitType: this.state.permitType,
      purchaseDate: this.state.curDate,
      expDate: this.state.futDate,
      type: this.state.permitType,
      vehicleInt: vInt,
      v1_year: parseInt(this.state.vYear),
      v1_make: this.state.vMake,
      v1_model: this.state.vModel,
      v1_color: this.state.vColor,
      v1_plate: this.state.vLic,
      v2_year: 2012,
      v2_make: "Honda",
      v2_model: "Civic",
      v2_color: "Red",
      v2_plate: "licensePlate2",
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

    //EXECUTION TIME!
  render() {
    return (
      <div>
        <SearchHeader activeName={this.props.pageName} description={this.props.pgDescription} />

        <div className="row">
          <div className="col-md-6">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">New Student Information</h3>
              </div>
              <form role="form">
                <div className="box-body">
                  <div className="form-group">
                    <label>First Name</label>
                      <input
                        className="form-control"
                        name="fname"
                        type="text"
                        value={this.state.fname}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                      <input
                        className="form-control"
                        name="lname"
                        type="text"
                        value={this.state.lname}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>NSHE</label>
                      <input
                        className="form-control"
                        name="NSHE"
                        type="text"
                        value={this.state.NSHE}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Phone Number (i.e. 7022589201)</label>
                      <input
                        className="form-control"
                        name="pnum"
                        type="text"
                        value={this.state.pnum}
                        onChange={this.handleChange} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="box box-car">
              {/*Start Vehicle Information*/}
              <div className="box-header">
                <h3 className="box-title">Vehicle Information</h3>
              </div>
              <form role="form">
                <div className="box-body">

                  <div className="form-group">
                    <label>Model Year</label>
                      <input
                        className="form-control"
                        name="vYear"
                        type="text"
                        value={this.state.vYear}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Color (i.e. Blue)</label>
                      <input
                        className="form-control"
                        name="vColor"
                        type="text"
                        value={this.state.vColor}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Car Make (i.e. Ford)</label>
                    <input
                      className="form-control"
                      name="vMake"
                      type="text"
                      value={this.state.vMake}
                      onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Model (i.e. Fusion)</label>
                    <input
                      className="form-control"
                      name="vModel"
                      type="text"
                      value={this.state.vModel}
                      onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>License Plate #</label>
                      <input
                        className="form-control"
                        name="vLic"
                        type="text"
                        value={this.state.vLic}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Permit Type</label>
                      <select className="form-control" name="permitType" value={this.state.permitType} onChange={this.handleChange}>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        <option value="guest">Guest</option>
                      </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-12">
            <div className="box box-office-use">
              <div className="box-header">
                <h3 className="box-title">Account Information</h3>
              </div>
              <form role="form">
                <div className="box-body">
                  <div className="form-group">
                    <label>Username</label>
                      <input
                        className="form-control"
                        name="uname"
                        type="text"
                        value={this.state.uname}
                        onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Card ID</label>
                      <input
                        className="form-control"
                        name="cid"
                        type="text"
                        value={this.state.cid}
                        onChange={this.handleChange} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-12">
            <div className="box box-office-use">
              <button className="form-control" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

Register.defaultProps = {
  //Page descriptors
  pageName: "Registration",
  pgDescription: "Students"
};

const mapProps = (store) => {
  return {
    sessionSocket: store.sessionSlice.socket.$get()
  }
}

export default connect({
  component: Register,
  mapProps
});
