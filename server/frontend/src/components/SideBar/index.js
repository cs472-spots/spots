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
              <img role="presentation" src="img/hey_reb.png" className="user-panel-image"></img>
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
            <a href="#/app/register" className="sidebar-menu-item">
              <i className="fa fa-user-plus"></i>
              <span className="sidebar-menu-item-text">Register Students</span>
            </a>
          </li>
          <li>
            <a href="#/app/view_accounts" className="sidebar-menu-item">
              <i className="fa fa-users"></i>
              <span className="sidebar-menu-item-text">View Accounts</span>
            </a>
          </li>
          <li>
            <a href="#/app/manage_accounts" className="sidebar-menu-item">
              <i className="fa fa-edit"></i>
              <span className="sidebar-menu-item-text">Manage Accounts</span>
            </a>
          </li>
          <li>
            <a href="#/app/monitor_spots" className="sidebar-menu-item">
              <i className="fa fa-automobile"></i>
              <span className="sidebar-menu-item-text">Monitor Spots</span>
              <div className={(this.props.notifications > 0) ? 'badge-num' : null}>{this.props.notifications}</div>
            </a>
          </li>
          <li>
            <a href="#/app/login" onClick={this.props.onClick} className="sidebar-menu-item">
              <i className="fa fa-sign-out"></i>
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
