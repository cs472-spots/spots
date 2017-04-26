
import React, { Component } from 'react';
import { connect } from 'nectarine';
import SearchHeader from '../../components/SearchForm/searchHeader.js';

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
        permitType: 'student',
        //Page descriptors
        pageName: "Registration",
        pgDescription: "Students"
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
    const { pageName, pgDescription } = this.state;
    return (
      <div>
        <SearchHeader activeName={pageName} description={pgDescription} />

        <div className="row">
          <div className="col-md-6">
            <div className="box box-primary">
              <div className="box-header">
                <h3 className="box-title">New Student Information</h3>
              </div>
              <form onSubmit={this.handleSubmit} role="form">
                <div className="box-body">
                  <div className="form-group">
                    <label>
                      First Name:
                      <input
                        className="form-control"
                        name="fname"
                        type="text"
                        value={this.state.fname}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Last Name:
                      <input
                        className="form-control"
                        name="lname"
                        type="text"
                        value={this.state.lname}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      NSHE:
                      <input
                        className="form-control"
                        name="NSHE"
                        type="text"
                        value={this.state.NSHE}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Email:
                      <input
                        className="form-control"
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number (i.e. 7022589201):
                      <input
                        className="form-control"
                        name="pnum"
                        type="text"
                        value={this.state.pnum}
                        onChange={this.handleChange} />
                    </label>
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
                    <label>
                      Color (i.e. Blue):
                      <input
                        className="form-control"
                        name="vColor"
                        type="text"
                        value={this.state.vColor}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Car License:
                      <input
                        className="form-control"
                        name="vLic"
                        type="text"
                        value={this.state.vLic}
                        onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                    Car Make (i.e. Ford):
                    <input
                      className="form-control"
                      name="vMake"
                      type="text"
                      value={this.state.vMake}
                      onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                    Model (i.e. Fusion):
                    <input
                      className="form-control"
                      name="vModel"
                      type="text"
                      value={this.state.vModel}
                      onChange={this.handleChange} />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Permit Type:
                      <select className="form-control" name="permitType" value={this.state.permitType} onChange={this.handleChange}>
                        <option value="student">Student</option>
                        <option value="staff">Staff</option>
                        <option value="guest">Guest</option>
                      </select>
                    </label>
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

const mapProps = (store) => {
  return {}
}

export default connect({
  component: Register,
  mapProps
});
