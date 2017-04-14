import React, { Component } from 'react';
import { connect } from 'nectarine';

//registration form
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fname: '',
        lname: '',
        NSHE:'',
        email: '',
        pnum:0,
        vColor:'',
        vLic:'',
        vMake:'',
        vModel:'',
        permitType: 'student'
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value
    const name = target.name;
    this.setState({
        [name]:value,
    });
  }

  handleSubmit = (event) => {
    alert('A form was completed. \n' +
      'Name: '+ this.state.fname +' '+this.state.lname+'\n'+
      'NSHE: ' + this.state.NSHE + '\n'+
      'Email: '+ this.state.email + '\n'+
      'Vehicle: ' + this.state.vColor + ' ' + this.state.vMake + ' ' + this.state.vModel + '\n'+
      'License: ' + this.state.vModel + '\n'+
      'Permit Type: ' + this.state.value
    );
    event.preventDefault();
  }

    //EXECUTION TIME!
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><h2>Register Your Account</h2></label>
        <br></br>

        <label><h3>User Information</h3></label>
        <br></br>
        <label>
          First Name:
          <input
            name="fname"
            type="text"
            value={this.state.fname}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Last Name:
          <input
            name="lname"
            type="text"
            value={this.state.lname}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          NSHE:
          <input
            name="NSHE"
            type="text"
            value={this.state.NSHE}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Phone Number (i.e. 7022589201):
          <input
            name="pnum"
            type="text"
            value={this.state.pnum}
            onChange={this.handleChange} />
        </label>
        <br></br>

        <label><h3>Vehicle Information</h3></label>
        <br></br>
        <label>
          Color (i.e. Blue):
          <input
            name="vColor"
            type="text"
            value={this.state.vColor}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Car License:
          <input
            name="vLic"
            type="text"
            value={this.state.vLic}
            onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
        Car Maker (i.e. Ford):
        <input
           name="vMake"
           type="text"
           value={this.state.vMake}
           onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
        Model (i.e. Fusion):
        <input
           name="vModel"
           type="text"
           value={this.state.vModel}
           onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Permit Type:
          <select name="permitType" value={this.state.permitType} onChange={this.handleChange}>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="guest">Guest</option>
          </select>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
  );
    }
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: Register,
  mapProps
});
