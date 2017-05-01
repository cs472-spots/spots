import React, { Component } from 'react';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SpotsMap from '../../components/SpotsMap';
import { connect } from 'nectarine';

class MonitorSpots extends Component {

	render () {
		return (
			<div>
				<SearchHeader activeName={this.props.pageName} description={this.props.pgDescription}/>
				<div className="map-content">
					<SpotsMap />
				</div>
			</div>
		);
	}
}

MonitorSpots.defaultProps = {
	pageName: "Monitor Spots",
	pgDescription: "Science and Engineering"
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: MonitorSpots,
  mapProps
});
