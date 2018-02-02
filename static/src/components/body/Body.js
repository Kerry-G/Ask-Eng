import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from './Register'
import Login from './LoginBox/Login'
import { connect } from 'react-redux'
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
    let login;
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) {
      login = <div className="box-login">
        <Login registerModal={this.handleShowRegister} />
      </div>
    }
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12} md={9}>
              {/* lorem ipsum */}
              </Col>
            <Col xs={12} md={3} mdOffset={9}>
              {login}
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

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Body = connect(
  mapStateToProps,
)(Body);

export default Body;
