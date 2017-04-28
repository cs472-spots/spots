import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'nectarine';

import Spot from './Spot';

const LAT = 36.111603;
const LNG = -115.141534;

function createMapOptions (maps) {
  return {
      zoomControlOptions: {
            position: maps.ControlPosition.TOP_LEFT,
            style: maps.ZoomControlStyle.SMALL
          },
      mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT
          },
      mapTypeControl: true
    };
}

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
        onClick={(e) => console.log(`(${e.lat}, ${e.lng})`)}
        options={createMapOptions}
        style={{cursor:'pointer'}}
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
