import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { login } from '../../../store/auth'
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      email: "",
      passw: ""
    };
  }

  handleLogin() {
    let user = { email: this.state.email, password: this.state.password }
    this.sendLoginInfo(user)
  }

  async sendLoginInfo(user) {
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myInit = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: myHeaders
      };
      let req = new Request("/api/users/authenticate/", myInit)
      fetch(req).then(res => (res.json()))
        .catch(e => console.error('Error:', e))
        .then(response => {
          try{
          if (response.success) {
            login(response.user)
          }} catch(e){console.error("Error",e)}
        })
    } catch (e) { console.error("Error: ", e) }
  }

  render() {

    return (
            <Form>
              <FormGroup bsSize="sm">
                <ControlLabel>E-mail</ControlLabel>{' '}
                <FormControl bsSize="sm" type="email" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="soen341@email.com" />
              </FormGroup>{' '}
              <FormGroup bsSize="sm">
                <ControlLabel>Password</ControlLabel>{' '}
                <FormControl bsSize="sm" placeholder="password" type="password" onChange={(e)=>{this.setState({password:e.target.value})}}  />
              </FormGroup>{' '}
              <p><a  className="link"  onClick={this.handleLogin}>Login</a>
              <span> or </span>
              <a className="link" onClick={this.props.registerModal}>Register</a>
              </p>
            </Form>
    );
  }
}
export default Login;
