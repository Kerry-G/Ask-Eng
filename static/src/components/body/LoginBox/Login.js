import React, { Component } from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap'
import { login } from '../../../store/auth'
import {fetchAPI} from '../../utility'
class Login extends Component{
  constructor(props){
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      email: "",
      password: "",
      alert: false
    }
  }

  handleLogin(){
    let user = { email: this.state.email, password: this.state.password }
    this.sendLoginInfo(user)
  }

  async sendLoginInfo(user){
    fetchAPI("POST", "/api/users/authenticate/", user).then(
      response => {
        try{
          if (response.success){
            login(response.user)
            this.setState({alert: false})
          }
          else{
            this.setState({alert: true})
          }
        } catch(e){console.error("Error", e)}
      }
    ).catch((e)=>console.error("Error:", e))
  }

  render(){
    let alert = null
    if (this.state.alert){
      alert = <Alert bsStyle="warning"><strong>Invalid email or password!</strong> Try again.</Alert>
    }
    else{
      alert = null
    } 
    return(
      <Form>
        {alert}
        <FormGroup bsSize="sm">
          <ControlLabel>E-mail</ControlLabel>{' '}
          <FormControl bsSize="sm" type="email" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="soen341@email.com" />
        </FormGroup>{' '}
        <FormGroup bsSize="sm">
          <ControlLabel>Password</ControlLabel>{' '}
          <FormControl bsSize="sm" placeholder="password" type="password" onChange={(e)=>{this.setState({password:e.target.value})}}  />
        </FormGroup>{' '}
        <p>
          <Button bsStyle="primary" onClick={this.handleLogin}>Login</Button>
          <span> or </span>
          <a className="link" onClick={this.props.registerModal}>Register</a>
        </p>
      </Form>
    );
  }
}
export default Login;