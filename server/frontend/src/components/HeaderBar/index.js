import React from 'react';
/* eslint-disable */

class HeaderBar extends React.Component {
  render() {
    const { profile } = this.props;

    return (
      <header>
        {
          // Spots logo
        }
        <div className="navbar-logo">
          <b>Admin</b>SPOTS
        </div>
        {
          // Navigation bar
        }
        <nav className="navbar">
          {
            // Sidebar-toggle button
          }
          <a href="javascript:;" onClick={this.props.onClick} className="navbar-sidebar-toggle-button">☰</a>
          {
            // Administrator info for quick log-out access
          }
          <div>
            <a href="#" className="navbar-admin">
              <img src="img/jedi.jpg" className="navbar-admin-image"></img>
              <span>{ profile.name }</span>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
