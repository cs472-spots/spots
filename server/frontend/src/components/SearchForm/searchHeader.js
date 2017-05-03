import React from 'react';

class SearchHeader extends React.Component {
  isHome (activeName) {
    if (activeName === "Monitor Spots") {
      return null;
    }
    else {
      return <li className="active">{activeName}</li>
    }
  }

  render() {
    const { activeName, description } = this.props;
    return (
      <div className="content-header">
        <h1>
          {activeName}
          <small>{description}</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <i className="fa fa-book"></i>
            <a href="#/app/monitor_spots"><span className="space-left">Home</span></a>
          </li>
          {this.isHome(activeName)}
        </ol>
      </div>
    )
  }
}

export default SearchHeader;
