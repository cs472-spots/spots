import React, { Component } from 'react';
import SearchHeader from '../../components/SearchForm/searchHeader.js';
import SpotsMap from '../../components/SpotsMap';
import { connect } from 'nectarine';

class MonitorSpots extends Component {

	render () {
		return (
			<div>
				<SearchHeader activeName={this.props.pageName} description={this.props.pgDescription}/>
				<p1>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis urna in felis faucibus tristique. In at augue sed est hendrerit laoreet a aliquet lorem. Curabitur eget massa interdum, sollicitudin ligula ut, scelerisque justo. Sed dapibus felis eget justo mattis iaculis. Pellentesque a sem malesuada mi imperdiet tristique nec at enim. Pellentesque iaculis metus ac magna volutpat, vitae porttitor odio cursus. Donec condimentum augue a molestie pellentesque. Nulla aliquet porta augue eget laoreet. Nullam euismod, libero sed faucibus commodo, sem quam condimentum turpis, vitae laoreet neque metus a nulla. Mauris pretium feugiat purus, ut congue quam lacinia eget. Quisque ut massa at leo molestie aliquet scelerisque eget nulla. Duis sollicitudin, odio sed tempus tristique, dui magna facilisis turpis, sed egestas nulla sem nec leo. Cras vel enim magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
				</p1>
			</div>
		);
	}
}

MonitorSpots.defaultProps = {
	pageName: "Monitor Spots",
	pgDescription: "Lied Library"
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: MonitorSpots,
  mapProps
});
