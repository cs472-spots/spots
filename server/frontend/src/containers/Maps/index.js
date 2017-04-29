import React, { Component } from 'react';
import { connect } from 'nectarine';
import SpotsMap from '../../components/SpotsMap';

class Maps extends Component {
  render () {
    return (
      <div>
        <SpotsMap/>
      </div>
    );
  }
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: Maps,
  mapProps
});
