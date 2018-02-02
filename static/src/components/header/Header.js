import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

class Header extends Component {

  render() {
    let user;
    if(this.props.className != {}){
      user = <p className="header-name">Hello {this.props.user}</p>
    }
    return (
        <Row className="header">
          <Col xs={10} >
              <h1>Engineering <small>out of bounds</small></h1>
          </Col>
          <Col>

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