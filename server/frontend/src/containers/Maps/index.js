import React, { Component } from 'react';
import { connect } from 'nectarine';

class Maps extends Component {
  render () {
    return (
      <div>
        <p1> Hello from this page </p1>
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
