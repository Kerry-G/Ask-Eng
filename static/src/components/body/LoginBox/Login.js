import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import {login} from '../../../store/auth'
import { connect } from 'react-redux'
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      email: "",
      pw: ""
    };
  }

  handleLogin() {
    let user ={"id":100, "fname": 'Jon', "lname": 'Mongeau', "email":'jon@jonmongeau.com', "password_hash":'PASSWORD_HASH_HERE', "register_date": '2017-30-01', "engineer": 'software', "display_image": '/path/to/img/1.jpg', "verified": 1 , "ups":0, "downs":0}
    login(user)
  }

  render() {

    console.log("user:"+ JSON.stringify(this.props.user))
    return (
            <Form>
              <FormGroup bsSize="sm">
                <ControlLabel>E-mail</ControlLabel>{' '}
                <FormControl bsSize="sm" type="email" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="jon.raiz@example.com" />
              </FormGroup>{' '}
              <FormGroup bsSize="sm">
                <ControlLabel>Password</ControlLabel>{' '}
                <FormControl bsSize="sm" type="password" onChange={(e)=>{this.setState({pw:e.target.value})}} />
              </FormGroup>{' '}
              <a onClick={this.handleLogin}>Login </a>
              or
              <a onClick={this.props.registerModal}> Register</a>
            </Form>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Login = connect(
  mapStateToProps,
)(Login);

export default Login;
