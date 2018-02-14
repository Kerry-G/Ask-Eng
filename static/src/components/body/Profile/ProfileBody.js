import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from '../Register'
import Login from '../LoginBox/Login'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
class ProfileBody extends Component {

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
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) 
      login = <div className="box-login"> <Login registerModal={this.handleShowRegister} /> </div>

    return (
      <div>
        <Grid fluid rows={1} cols={1}>
          <Row>
            <Col xs={2} lg={12} mdOffset={8}>
              {/* sidebar */}
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

ProfileBody = connect(
  mapStateToProps,
)(ProfileBody);

export default ProfileBody;
