import React from 'react';

class SearchForm extends React.Component {
  render() {
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
                   placeholder="First Name"></input>
                </div>
                {/* LastName */}
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Last Name"></input>
                </div>
                {/* Address */}
                <div className="form-group">
                  <label>Address</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Address"></input>
                </div>
                {/* City and Zip*/}
                <div className="form-group">
                  <label>City, Zip</label>
                  <input type="text"
                   className="form-control"
                   placeholder="City, Zip"></input>
                </div>
                {/* NSHE ID # */}
                <div className="form-group">
                  <label>NSHE ID #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="NSHE ID Number"></input>
                </div>
                {/* Phone # */}
                <div className="form-group">
                  <label>Phone #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Phone Number"></input>
                </div>
                {/* Citations */}
                <div className="form-group">
                  <label>Citations</label>
                  <select className="form-control">
                    <option>Number 1</option>
                    <option>Number 2</option>
                    <option>Number 3</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
            {/* General Information Form */}
            <div className="box box-citations">
              {/* Citations */}
              <div className="box-header">
                <h3 className="box-title">Citations</h3>
              </div>
              {/* Form starts here */}
              <form role="form">
                <div className="box-body">
                  {/* Date */}
                  <div className="form-group">
                    <label>Date</label>
                    <input type="text"
                     className="form-control"
                     placeholder="Date"></input>
                  </div>
                  {/* Time issued */}
                  <div className="form-group">
                    <label>Time Issued</label>
                    <input type="text"
                     className="form-control"
                     placeholder="Time Issued"></input>
                  </div>
                  {/* License Number */}
                  <div className="form-group">
                    <label>License Number</label>
                    <input type="text"
                     className="form-control"
                     placeholder="License Number"></input>
                  </div>
                  {/* Location Of Violation */}
                  <div className="form-group">
                    <label>Location Of Violation</label>
                    <input type="text"
                     className="form-control"
                     placeholder="Location Of Violation"></input>
                  </div>
                  {/* Violation */}
                  <div className="form-group">
                    <label>Violation</label>
                    <input type="text"
                     className="form-control"
                     placeholder="Violation"></input>
                  </div>
                  {/* Fine Amount Due*/}
                  <div className="form-group">
                    <label>Fine Amount Due</label>
                    <input type="text"
                     className="form-control"
                     placeholder="Fine Amount Due"></input>
                  </div>
                  {/* Comments */}
                  <div className="form-group">
                    <label>Comments</label>
                    <textarea className="form-control" rows="3"
                     placeholder="Comments..."></textarea>
                  </div>
                </div>
              </form>
            </div>
        </div>
        {/* ===================================================* /}
        {/* Left Column */}
        <div className="col-md-6">
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
                   placeholder="Parking Sticker Number"></input>
                </div>
                {/* Type Of Sticker */}
                <div className="form-group">
                  <label>Type Of Sticker</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Type Of Sticker"></input>
                </div>
                {/* Semester */}
                <div className="form-group">
                  <label>Semester</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Semester"></input>
                </div>
              </div>
            </form>
          </div>
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
                   placeholder="Year"></input>
                </div>
                {/* Make */}
                <div className="form-group">
                  <label>Make</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Make"></input>
                </div>
                {/* Model */}
                <div className="form-group">
                  <label>Model</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Model"></input>
                </div>
                {/* Color */}
                <div className="form-group">
                  <label>Color</label>
                  <input type="text"
                   className="form-control"
                   placeholder="Color"></input>
                </div>
                {/* License Plate # */}
                <div className="form-group">
                  <label>License Plate #</label>
                  <input type="text"
                   className="form-control"
                   placeholder="License Plate Number"></input>
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
