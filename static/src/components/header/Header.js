import React, { Component } from 'react'
import { Col, Row, Image} from 'react-bootstrap'
import { connect } from 'react-redux'
import { logOut, reload } from '../../store/auth'
import { Link } from 'react-router-dom'
import Headermenu from '../header/Headermenu'

class Header extends Component {

  render() {
    // <Link to={`/ideas/${this.props.testvalue}`}>{this.props.testvalue}</Link> not sure what is this
    let user;
    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if the user is connected
      // user = <p className="header-name"> Hello, <Link to={`/users/${this.props.user.id}`} onClick={reload} style={{ color: 'white' }}>{this.props.user.fname} {this.props.user.lname}</Link>&nbsp;|&nbsp;&nbsp;
      
    }
    let image;
    image = "\\images\\ask-eng.png"
    let drop;

           
    return (
      <Row className="header">
        <Col lg={6}>
          <h1><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Image src={image} width={64} circle />&nbsp;Ask<small>ENG</small>
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