import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'nectarine';

import Spot from './Spot';

const LAT = 36.106992;
const LNG = -115.143744;

class SpotsMap extends Component {
  static defaultProps = {
    center: {lat: LAT, lng: LNG},
    zoom: 19
  };

  renderSpots = () => {
    var spots = this.props.getSpots()
    var renderedSpots = Object.keys(spots).map((key, index) => {
      return (
        <Spot
          key={index}
          {...spots[key]}
        />
      );
    });

    return renderedSpots;
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyDBvguT8pFWdDPHafS-vRjHiFEWgYNSkQ8'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.renderSpots()}
      </GoogleMapReact>
    )
  }
}

const mapProps = (store) => {
  return {
    getSpots: store.sessionSlice.getSpots
  }
}

export default connect({
  component: SpotsMap,
  mapProps
});
