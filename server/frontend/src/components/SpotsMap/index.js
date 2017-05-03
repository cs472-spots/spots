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
      mapTypeControl: false
    };
}


class SpotsMap extends Component {
  static defaultProps = {
    center: {lat: LAT, lng: LNG},
    zoom: 20
  };

  constructor () {
    super();
    this.state = {
      showBalloon: false
    }
  }

  _onChildClick = (key, childProps) => {
    this.props.setSpotIndex(parseInt(key, 10));
  }

  onClose = () => {
    this.props.setSpotIndex(-1);
  }

  renderSpots = () => {
    if (this.props.spots === null){
      return null;
    }
    var spots = this.props.getSpots()
    var renderedSpots = Object.keys(spots).map((key, index) => {
      return (
        <Spot
          key={index}
          {...spots[key]}
          index={index}
          showBalloon={(index === (this.props.spotIndex))}
          onClick={this.onClose}
        />
      );
    });

    return renderedSpots;
  }

  componentDidMount() {
    this.props.setSpots();
  }

   render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyDBvguT8pFWdDPHafS-vRjHiFEWgYNSkQ8'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onChildClick={this._onChildClick}
        options={createMapOptions}
        style={{cursor:'default'}}
        hoverDistance={15 /*Change this value, in example K_CIRCLE_SIZE/2 ?*/}
      >
        {this.renderSpots()}
      </GoogleMapReact>
    )
  }
}

const mapProps = (store) => {
  return {
    spots: store.sessionSlice.spots.$get(),
    setSpots: store.sessionSlice.setSpots,
    getSpots: store.sessionSlice.getSpots,
    setSpotIndex: (index) => store.sessionSlice.spotIndex.$set(index),
    spotIndex: store.sessionSlice.spotIndex.$get()
  }
}

export default connect({
  component: SpotsMap,
  mapProps
});
