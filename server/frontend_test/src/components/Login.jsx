import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';

import { Thumbnail, Tabs, Tab, Checkbox, FormControl, Form, FormGroup, Col, ControlLabel, Row, Grid, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron, PageHeader, Panel } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default React.createClass ({
  mixins: [PureRenderMixin],
  
  getInitialState: function() {
    return {
      value: '',
      key: 1
    };
  },
  
  handleSelect: function (key) {
    //alert ('selected' + key);
    this.setState ({value: '', key});
  },
  
  getValidLen: function() {
		const length = this.state.value.length;
		if (length == 10) return 'success';
		else if (length > 1) return 'warning';
		else if (length > 10) return 'error';
	},
  
  handleChange: function(e) {
    this.setState({ value: e.target.value });
  },
  
  render: function () {
    return <div>
      <Grid>
        <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href = "#"> SPOTS </a>
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

        <Panel>
        <Tabs activeKey={this.state.key} onSelect = {this.handleSelect} id="controlled-tab-example">
          <Tab eventKey={1} title="Admin">
          <br/>
          <Form horizontal>
            <FormGroup controlId = "formHorizontalID" validationState={this.getValidLen()}>
              <Col componentClass = { ControlLabel } sm = {2}>
                Admin ID
              </Col>
              <Col sm = {10}>
                <FormControl type = "ADMINID" placeholder = "Admin ID" value = {this.state.value} onChange = {this.handleChange} />
                <FormControl.Feedback />
              </Col>
            </FormGroup>

            <FormGroup controlId = "formHorizontalPassword">
              <Col componentClass = { ControlLabel } sm = {2}>
                Password
              </Col>
              <Col sm = {10}>
                <FormControl type = "password" placeholder = "Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset = {2} sm = {10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset = {2} sm = {10}>
                <Button type = "submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
          </Tab>

          <Tab eventKey={2} title="Student">
          <br/>
          <Form horizontal>
            <FormGroup controlId = "formHorizontalID" validationState = {this.getValidLen()}>
              <Col componentClass = { ControlLabel } sm = {2}>
                NSHE ID
              </Col>
              <Col sm = {10}>
                <FormControl type = "NSHEID" placeholder = "NSHE ID" value = {this.state.value} onChange = {this.handleChange} />
                <FormControl.Feedback/>
              </Col>
            </FormGroup>

            <FormGroup controlId = "formHorizontalPassword">
              <Col componentClass = { ControlLabel } sm = {2}>
                Password
              </Col>
              <Col sm = {10}>
                <FormControl type = "password" placeholder = "Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset = {2} sm = {10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset = {2} sm = {10}>
                <Button type = "submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
          </Tab>
        </Tabs>
        </Panel>
      </Grid>
   </div>
  }
});