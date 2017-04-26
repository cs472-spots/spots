import React, { Component } from 'react';
import { connect } from 'nectarine';

class Error404 extends Component {
  render () {
    return (
      <div className="Error-Class">
        <h1>Error 404: You shall not pass!</h1>
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
