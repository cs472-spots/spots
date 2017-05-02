import React from 'react';

class SearchForm extends React.Component {
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
                   value={info.firstName}></input>
                </div>
                {/* LastName */}
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Last Name"
                   value={info.lastName}></input>
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
                  <label>NSHE ID #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="NSHE ID Number"
                   value={info.userID}></input>
                </div>
                {/* Phone # */}
                <div className="form-group">
                  <label>Phone #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Phone Number"
                   value={info.phone}></input>
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
                  <label>Parking Sticker #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Parking Sticker Number"
                   value={info.cardid}></input>
                </div>
                {/* Type Of Sticker */}
                <div className="form-group">
                  <label>Type Of Sticker</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Type Of Sticker"
                   value={info.permitType}></input>
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
                   /*value={info.v1_year}*/></input>
                </div>
                {/* Make */}
                <div className="form-group">
                  <label>Make</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Make"
                   value={info.v1_make}></input>
                </div>
                {/* Model */}
                <div className="form-group">
                  <label>Model</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Model"
                   value={info.v1_model}></input>
                </div>
                {/* Color */}
                <div className="form-group">
                  <label>Color</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Color"
                   value={info.v1_color}></input>
                </div>
                {/* License Plate # */}
                <div className="form-group">
                  <label>License Plate #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="License Plate Number"
                   value={info.v1_plate}></input>
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
