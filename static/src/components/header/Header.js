import React, { Component } from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Headermenu from '../header/Headermenu'

class Header extends Component {

  render() {
    let image = "\\images\\ask-eng.png"
    return (
      <div className="header">
      
        <h1>
          <Link to='/' style={{ textDecoration: 'none', color: "#E27A3F" }}>
            <img src={image} width={30} circle />&nbsp;Ask<small>ENG</small>
          </Link>
        </h1>

          <div className ="menu">
              <Headermenu
                user = {this.props.user}
              />
          </div>  

      </div>
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