// src/containers/Register/index.js

import React, { Component } from 'react';
//import classnames from 'classnames';
<head>
  <script src="http://fb.me/react-0.10.0.min.js"></script>
  <script src="http://fb.me/JSXTransformer-0.10.0.js"></script>
</head>


/*
class Register extends Component {
  render () {
    const { className, ...props } = this.props;

    return (
      <div className={classnames('Register', className)} {...props}>
            <h2>Hello from Register!</h2>
	    </div>
    )
     
    }
   
}
*/
//for the database info




//registration form
class Register extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    fname: '',
	    lname: '',
	    NSHE:0,
	    email: '',
	    pnum:0,
	    vColor:'',
	    vLic:'',
	    vMake:'',
	    vModel:'',
	    value: 'student'
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handlechange2 = this.handleChange2.bind(this);
    }

    handleChange(event) {
	const target = event.target;
	const value = target.value
	const name = target.name;
	this.setState({
	    [name]:value,
	   
	    
	});
    }
    handleChange2(event){
	this.setState({value: event.target.value});
    }

    handleSubmit(event) {
	alert('A form was completed. ' + '\n' +
	      'Name: '+ this.state.fname +' '+this.state.lname+'\n'+
	      'NSHE: ' + this.state.NSHE + '\n'+
	      'Email: '+ this.state.email + '\n'+
	      'Vehicle: ' + this.state.vColor + ' ' + this.state.vMake + ' ' + this.state.vModel + '\n'+
	      'License: ' + this.state.vModel + '\n'+
	      'Permit Type: ' + this.state.value
	     );
	event.preventDefault();
    }
    //firebase function
    



    
    //EXECUTION TIME!
    render() {
	return (
	      
		<form onSubmit={this.handleSubmit}>
		<label><h2>Register Your Account</h2></label>
		<br></br>
		<label><h3>User Information</h3></label>
		<br></br>
		<label> 
		First Name:
		<input 
	          name = "fname"
	          type = "text"
	          value={this.state.fname}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label> 
		Last Name:
		<input 
	          name = "lname"
	          type = "text"
	          value={this.state.lname}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label>
		NSHE:
		<input 
	          name = "NSHE"
	          type = "number"
	          value={this.state.NSHE}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label> 
		Email:
		<input 
	          name = "email"
	          type = "text"
	          value={this.state.email}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label> 
		Phone Number (exclude "-" and include area code):
		<input 
	          name= "pnum"
	          type = "text"
	          value={this.state.pnum}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label><h3>Vehicle Information</h3></label>
		<br></br>
		<label> 
		Color:
		<input 
	          name= "vColor"
	          type = "text"
	          value={this.state.vColor}
	          onChange={this.handleChange} />
		</label>
		<br></br>
                <label> 
		Car License:
		<input 
	          name= "vLic"
	          type = "text"
	          value={this.state.vLic}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label> 
		Car Maker:
		<input 
	          name= "vMake"
	          type = "text"
	          value={this.state.vMake}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		<label> 
		Model:
		<input 
	          name= "vModel"
	          type = "text"
	          value={this.state.vModel}
	          onChange={this.handleChange} />
		</label>
		<br></br>
		
		<label>
		Permit Type:
		<select value={this.state.value} onChange={this.handleChange2}>
		<option value="student">Student</option>
		<option value="staff">Staff</option>
		<option value="guest">Guest</option>
	        </select>
		</label>
		<br></br>
		<input type="submit" value="Submit" />
		</form>
	);
    }
}


export default Register;
