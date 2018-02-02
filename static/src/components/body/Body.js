import React, { Component } from 'react'
import {Row,Col, Grid} from'react-bootstrap'
import Register from './Register'
import Login from './LoginBox/Login'
class Body extends Component {

  constructor(props) {
    super(props);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
    this.state = {
      showRegister: false,
    };
  }

  handleCloseRegister() {
    this.setState({ showRegister: false });
  }

  handleShowRegister() {
    this.setState({ showRegister: true });
  }


  render() {
    return (
      <div>
        <Grid fluid>
        <Row>
          <Col xs={12} md={3} mdOffset={9}>
          <div className="box-login">
            <Login registerModal={this.handleShowRegister}/>
          </div>
          </Col>
        </Row>
          <Register 
          show={this.state.showRegister} 
          handleClose={this.handleCloseRegister} />
          </Grid>
      </div>
    )
  }
}

export default Body;
