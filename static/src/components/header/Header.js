import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import {logOut} from '../../store/auth'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
class Header extends Component {

  render() {
    let user;
    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)){ //if the user is connected
      user = <p className="header-name"> Hello {this.props.user.fname} {this.props.user.lname}&nbsp;|&nbsp;&nbsp;<a className="logoutBtn" onClick={logOut}>log out</a></p>

    }
    return (
        <Row className="header">
          <Col xs={8} >
              <h1><Link to='/Home' style={{textDecoration: 'none', color: 'white'}}>Ask&nbsp;<small>Eng</small></Link></h1>
          </Col>
          <Col xsHidden md={4}>
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