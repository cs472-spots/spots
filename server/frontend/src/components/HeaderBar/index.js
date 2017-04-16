import React from 'react';

class HeaderBar extends React.Component {
  render() {
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
              <span>obi-wan kenobi</span>
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderBar;
