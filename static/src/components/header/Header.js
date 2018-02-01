import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap'
import Register from './Register'
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
    this.state = {
      showRegister: false
    };
  }

  handleCloseRegister() {
    this.setState({ showRegister: false });
  }

  handleShowRegister() {
    this.setState({ showRegister: true });
  }

  render() {
    let registerStyle = {
      fontSize: 14,
      position: 'absolute',
      bottom: '0px',
      right: '12px'
    }
    return (
      <div>
        <PageHeader>

          Engineering overflow <small> SOEN341</small>
          <span style={registerStyle}><a onClick={this.handleShowRegister}>Register</a></span>

        </PageHeader>
        <Register 
          show={this.state.showRegister} 
          handleClose={this.handleCloseRegister} />
      </div>
    );
  }
}



export default Header;
