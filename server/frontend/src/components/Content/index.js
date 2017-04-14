import React from 'react';

class Content extends React.Component {
  render() {
    var contentClass = this.props.isOpen ? 'content open' : 'content';
    return (
      <div className={contentClass}>
      </div>
    );
  }
}

export default Content;
