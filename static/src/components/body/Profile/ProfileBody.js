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
        <Grid fluid>
          <Row>
            <Col mdOffset={0} xs={12}  lgOffset={2} lg={8}>
            </Col>
            <Col xs={12} lg={2}>
              {/* sidebar */}
              {login}
            </Col>
          </Row>
          <Register
            show={this.state.showRegister}
            handleClose={this.handleCloseRegister} />
        </Grid>
		<Grid fluid>
			<Row>
			<Col mdOffset = {0} xs={8} lgOffset={1}>
			</Col>
			</Row>
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
