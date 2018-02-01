import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

class Header extends Component {
  render() {
    return (
        <Row className="header">
          <Col xs={12} >
              <h1>Engineering <small>out of bounds</small></h1>
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