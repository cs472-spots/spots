import React from 'react';

class SideBar extends React.Component {

  render() {
    const { profile } = this.props;
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';

    return (
      <div className={sidebarClass}>
        <div>
          {
            // User panel
          }
          <div className="user-panel">
            <div className="user-pull-left">
              <img role="presentation" src="img/jedi.jpg" className="user-panel-image"></img>
            </div>
            <div className="user-pull-left-info">
              <p>Hello { profile.name }</p>
              <i className="user-online"></i>
              <i className="user-online-msg">Online</i>
            </div>
          </div>
        </div>
        {
          // Main navigation
        }
        <ul className="sidebar-menu">
          <li className="sidebar-menu-header">MAIN NAVIGATION</li>
          <li>
            <a href="#/register" className="sidebar-menu-item">
              <i className="fa fa-edit"></i>
              <span className="sidebar-menu-item-text">Register Students</span>
            </a>
          </li>
          <li>
            <a href="#/view_accounts" className="sidebar-menu-item">
              <i className="fa fa-book"></i>
              <span className="sidebar-menu-item-text">View Payments & Fees</span>
            </a>
          </li>
          <li>
            <a href="#/monitor_spots" className="sidebar-menu-item">
              <i className="fa fa-laptop"></i>
              <span className="sidebar-menu-item-text">Monitor Spots</span>
            </a>
          </li>
          <li>
            <a href="#/login" onClick={this.props.onClick} className="sidebar-menu-item">
              <i className="fa fa-laptop"></i>
              <span className="sidebar-menu-item-text">Logout</span>
            </a>
          </li>
        </ul>
        {
          //<button onClick={this.props.toggleSidebar} className="sidebar-toggle">Sidebar</button>
        }
      </div>
    );
  }
}

export default SideBar;
