import React, { Component } from 'react';
import Style from './Styles';

class Spot extends Component {

  render() {
    return (
      <div style={Style.notVacant} className={this.props.$hover? 'cursor-hover' : null}>
        <div className={this.props.showBalloon ? 'balloon open' : 'balloon'}>
          <div onClick={this.props.onClick} className="fa fa-times-circle-o circle-x"/>
          <div className='balloon-content'>
            <div className='balloon-content header'>
              <strong><u>Spot {this.props.index + 1}</u></strong>
            </div>
            <div className='balloon-content content'>
              <strong>Name:</strong><br/>
              <strong>Valid:</strong> {this.props.authorized}<br/>
              <strong>Type:</strong> {this.props.type}<br/>
              <strong>Vacancy:</strong> {this.props.vacancy}<br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Spot;
