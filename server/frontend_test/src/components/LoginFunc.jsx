import React from 'react';
import {Link} from 'react-router';

export default React.createClass ({
	getValidLen: function() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}
	
	
});