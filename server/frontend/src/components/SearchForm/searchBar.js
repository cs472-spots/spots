import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVisible: true,
      search: ''
    }
    this.showSearch = this.showSearch.bind(this);
  }

  render() {
    // Classes to add to animate search bar on click
    let searchInputClasses = ["searchInput"];
    // Update the array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }
    return (
      <div className="search-header">
        <div className="fa fa-more"></div>
        {/* Title in search bar */}
        <span className="title">
          {this.props.title}
        </span>
        {/* Text box */}
        <input
         type="text"
         className={searchInputClasses.join(' ')}
         value={this.props.search}
         onChange={this.props.handleChange}
         placeholder="Search by User ID"/>
       {/**/}
       <div className="w3-xlarge">
       <div onClick={this.props.onClick}
        className="fa fa-search searchIcon"></div></div>
      </div>
    )
  }

  // Visibility when run on the state
  showSearch() {
    this.setState({
      searchVisible: true
    });
  }
}

export default SearchBar;
