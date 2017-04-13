//src/containers/Login/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'nectarine';

import { Checkbox,
         FormControl,
         Form,
         FormGroup,
         Col,
         ControlLabel,
         Grid,
         Button,
         Panel
       } from 'react-bootstrap';

import './Login.css';

class Login extends Component {

  render() {
    const { className, ...props } = this.props;

    return (
      <div className={classnames('About', className)} {...props}>
      <div className="Login-Header">
        <center><h1>Welcome to SPOTS!</h1></center>
      </div>

        <div className="Login-Content">
          <Grid>
            <Panel>
              <Form horizontal>
                <FormGroup controlId="formHorizontalID">
                  <Col componentClass={ ControlLabel } sm={2}>
                    Admin ID
                  </Col>
                  <Col sm={10}>
                    <FormControl type="ADMINID" placeholder="Admin ID" />
                    <FormControl.Feedback />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ ControlLabel } sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Sign in
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Panel>
          </Grid>
        </div>
	    </div>
    );
  }
}

const mapProps = (store) => {
  return {}
}

export default connect({
  component: Login,
  mapProps
});
