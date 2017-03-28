import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import { Grid, Thumbnail, Image, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron, PageHeader, Panel, Row, Col  } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default React.createClass ({
  mixins: [PureRenderMixin],
  render: function () {
      return <div>
                
        <Grid>
          <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href = "#"><img src = "/assets/logo.png"></a>
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
          
          <Jumbotron>
            <div>
              <Image src = "/assets/logo.png" responsive />
              <h1>UNLV parking sucks, we'll make it better! </h1>
            </div>
          </Jumbotron>
        </Grid>
      </div>
  }
});
