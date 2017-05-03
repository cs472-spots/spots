import React from 'react';

class SearchForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      info: {
        firstName: ''
      }
    }
  }

  render() {
    const { info } = this.props;
    return (
      <div className="row">
        {/* Left column */}
        <div className="col-md-6">
          {/* General Information Form */}
          <div className="box box-primary">
            {/* General Information */}
            <div className="box-header">
              <h3 className="box-title">General Information</h3>
            </div>
            {/* Form starts here */}
            <form role="form">
              <div className="box-body">
                {/* Name */}
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text"
                   className="form-control"
                   placeholder="First Name"
                   name="firstName"
                   value={info.firstName}
                   onChange={this.props.userChange}></input>
                </div>
                {/* LastName */}
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Last Name"
                   name="lastName"
                   value={info.lastName}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Address */}
                {/*Add Address field to database
                <div className="form-group">
                  <label>Address</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Address"
                   readOnly></input>
                </div>*/}
                {/* City and Zip*/}
                {/* Add City and Zip to databse
                <div className="form-group">
                  <label>City, Zip</label>
                  <input type="text"
                   className="form-control"
                   placeholder="City, Zip"
                   readOnly></input>
                </div>*/}
                {/* NSHE ID # */}
                <div className="form-group">
                  <label>NSHE ID</label>
                  <input type="text"
                   className="form-control"
                   placeholder="NSHE"
                   name="userID"
                   value={info.userID}
                   onChange={this.props.userChange}></input>
                </div>
                {/* E-mail address*/}
                <div className="form-group">
                  <label>Email</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Email"
                   name="email"
                   value={info.email}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Phone # */}
                <div className="form-group">
                  <label>Phone #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Phone Number"
                   name="phone"
                   value={info.phone}
                   onChange={this.props.userChange}></input>
                </div>
              </div>
            </form>
          </div>
          {/* For Office Use Only Form */}
          <div className="box box-office-use">
            {/* For Office Use Only */}
            <div className="box-header">
              <h3 className="box-title">For Office Use Only</h3>
            </div>
            {/* Form starts here */}
            <form role="form">
              <div className="box-body">
                {/* Parking Sticker # */}
                <div className="form-group">
                  <label>Card ID #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Card ID #"
                   name="cardid"
                   value={info.cardid}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Type Of Sticker */}
                <div className="form-group">
                  <label>Permit Type</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Permit Type"
                   name="permitType"
                   value={info.permitType}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Semester */}
                {/*Add Semester field to database
                <div className="form-group">
                  <label>Semester</label>
                  <input type="text"
                   className="form-control"
                   readOnly
                   placeholder="Semester"></input>
                </div>*/}
              </div>
            </form>
          </div>
        </div>
        {/* ===================================================* /}
        {/* Left Column */}
        <div className="col-md-6">
          {/* Vehicle Information Form */}
          <div className="box box-car ">
            {/* Vehicle Information */}
            <div className="box-header">
              <h3 className="box-title">Vehicle Information</h3>
            </div>
            {/* Form starts here */}
            <form role="form">
              <div className="box-body">
                {/* Year */}
                <div className="form-group">
                  <label>Year</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Year"
                   name="v1_year"
                   /*value={info.v1_year}*/
                   onChange={this.props.userChange}></input>
                </div>
                {/* Make */}
                <div className="form-group">
                  <label>Make</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Make"
                   name="v1_make"
                   value={info.v1_make}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Model */}
                <div className="form-group">
                  <label>Model</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Model"
                   name="v1_model"
                   value={info.v1_model}
                   onChange={this.props.userChange}></input>
                </div>
                {/* Color */}
                <div className="form-group">
                  <label>Color</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Color"
                   name="v1_color"
                   value={info.v1_color}
                   onChange={this.props.userChange}></input>
                </div>
                {/* License Plate # */}
                <div className="form-group">
                  <label>License Plate #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="License Plate Number"
                   name="v1_plate"
                   value={info.v1_plate}
                   onChange={this.props.userChange}></input>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
