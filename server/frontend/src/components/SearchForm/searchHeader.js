import React from 'react';

class SearchHeader extends React.Component {
  render() {
    {/**/}
    const { activeName, description, isHome } = this.props;
    return (
      <div className="content-header">
        <h1>
          {activeName}
          <small>{description}</small>
        </h1>
        <ol className="breadcrumb">
          <li>
            <i className="fa fa-book"></i>
            <span className="space-left">Home</span>
          </li>
          <li className="active">
            {activeName}
          </li>
        </ol>
      </div>
    )
  }
}

export default SearchHeader;
