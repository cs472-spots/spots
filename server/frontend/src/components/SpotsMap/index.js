import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'nectarine';

import Spot from './Spot';

class SpotsMap extends Component {
  static defaultProps = {
    center: {lat: 36.106992, lng: -115.143744},
    zoom: 19
  };

  renderSpots = () => {
    var spots = this.props.getSpots()
    var renderedSpots = Object.keys(spots).map((key, index) => {
      console.log(spots[key]);
      return (
        <Spot
          key={index}
          {...spots[key]}
        />
      );
    });

    return [(
      <Spot
        lat={36.106992}
        lng={-115.143744}
        key='1'
      />
    ),
    (
      <Spot
        lat={36.106795}
        lng={-115.143744}
        key='2'
      />
    )]
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
