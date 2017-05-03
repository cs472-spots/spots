import React, { Component } from 'react';
import Style from './Styles';

class Spot extends Component {
  render() {
    var spotColor = this.props.vacancy ? 'yellow' : 'green';
    spotColor = this.props.authorized ? spotColor : 'red';
    Style.border = `5px solid ${spotColor}`

    return (
      <div style={Style} className={this.props.$hover? 'cursor-hover' : null}>
        <div className={this.props.showBalloon ? 'balloon open' : 'balloon'}>
          <div onClick={this.props.onClick} className="fa fa-times-circle-o circle-x"/>
          <div className='balloon-content'>
            <div className='balloon-content header'>
              <strong><u>Spot {this.props.index + 1}</u></strong>
            </div>
            <div className='balloon-content content'>
              <strong>Name:</strong><br/>
              <strong>Authorized:</strong> {this.props.authorized}<br/>
              <strong>Type:</strong> {this.props.type}<br/>
              <strong>Vacancy:</strong> {this.props.vacancy.toString()}<br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Spot;
