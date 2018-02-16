import React, { Component } from 'react'
import { Col, Row, Image} from 'react-bootstrap'
import { connect } from 'react-redux'
import { logOut, reload } from '../../store/auth'
import { Link } from 'react-router-dom'
import Headermenu from '../header/Headermenu'

class Header extends Component {

  render() {
    let image = "\\images\\ask-eng.png"
           
    return (
      <Row className="header">
        <Col lg={6}>
          <h1><Link to='/' style={{ textDecoration: 'none', color: '#e74c3c' }}>
            <Image src={image} width={30} circle />&nbsp;Ask<small>ENG</small>
          </Link>
          
          </h1>
        </Col>
        <Col  lg={6}>
         <div className ="menu">
        <Col lgOffset ={8}>
        <Headermenu
        user = {this.props.user}/>
         </Col>
         </div>
         
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