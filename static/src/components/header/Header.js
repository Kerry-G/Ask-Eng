import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import {logOut} from '../../store/auth'
class Header extends Component {

  render() {
    let user;
    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)){
      user = <p className="header-name"> Hello {this.props.user.fname} {this.props.user.lname} <a onClick={logOut}> log out</a></p>
    }
    return (
        <Row className="header">
          <Col xs={10} >
              <h1>Engineering <small>out of bounds</small></h1>
          </Col>
          <Col>
            {user}
          </Col>
        </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Header = connect(
  mapStateToProps,
)(Header);

export default Header;