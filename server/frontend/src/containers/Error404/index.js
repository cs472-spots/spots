import React, { Component } from 'react';
import { connect } from 'nectarine';

class Error404 extends Component {
  render () {
    return (
      <div className="Error-Class">
      </div>
    )
  }
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: Error404,
  mapProps
});
