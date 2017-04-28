import React, { Component } from 'react';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SpotsMap from '../../components/SpotsMap';
import { connect } from 'nectarine';

class MonitorSpots extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pageName: "Monitor Spots",
        pgDescription: "Lied Library"
    };
  }

  render () {
    const { pageName, pgDescription } = this.state;
    return (
      <div>
        <SearchHeader activeName={pageName} description={pgDescription}/>
        <SpotsMap/>
      </div>
    );
  }
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: MonitorSpots,
  mapProps
});
