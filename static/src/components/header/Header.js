import React, { Component } from 'react'
import {Col, Row, Image} from 'react-bootstrap'
import { connect } from 'react-redux'
import {logOut, reload} from '../../store/auth'
import { Link } from 'react-router-dom';
class Header extends Component {

  render() {
  // <Link to={`/ideas/${this.props.testvalue}`}>{this.props.testvalue}</Link> not sure what is this
    let user;
    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)){ //if the user is connected
      user = <p className="header-name"> Hello, <Link to={`/users/${this.props.user.id}`} onClick={reload} style={{color: '#00647f'}}>{this.props.user.fname} {this.props.user.lname}</Link>&nbsp;|&nbsp;&nbsp;<a className="logoutBtn" onClick={logOut}>log out</a></p>
    }
    let image;
      image = "\\images\\ask-eng.png"
    return (
        <Row className="header">
          <Col xs={6}>
            <h1><Link to='/' style={{textDecoration: 'none', color: '#c0392b'}}>
                <Image src={image} width={64} circle />&nbsp;Ask<small>ENG</small>
                </Link>
              </h1>
          </Col>
          <Col xs={6}>
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