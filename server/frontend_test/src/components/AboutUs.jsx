import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, PageHeader, Panel, Grid  } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default React.createClass ({
  mixins: [PureRenderMixin],
  render: function () {
      return <div>
        <Grid>
          <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href = "#">SPOTS</a>
              </Navbar.Brand>
            </Navbar.Header>

            <Nav pullRight>
              <LinkContainer to = "/login">
                <NavItem eventKey = {1}>Login</NavItem>
              </LinkContainer>

              <LinkContainer to = "/register">
                <NavItem eventKey = {2}>Register</NavItem>
              </LinkContainer>

               <LinkContainer to = "/aboutus">
                <NavItem eventKey = {3}>About Us</NavItem>
              </LinkContainer>

              <LinkContainer to = "/contact">
                <NavItem eventKey = {4}>Contact</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
          <br/><br/><br/><br/>

          
          <Panel header={<h1>About Us</h1>} bsStyle = "info">
            We are SPOTS, we're going to make UNLV parking not suck!
            <br/>
            CS472 Spring 2017
          </Panel>
        </Grid>
     </div>
  }
});