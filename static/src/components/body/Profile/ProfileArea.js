import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from '../Register'
import Login from '../LoginBox/Login'
import { connect } from 'react-redux'
class Body extends Component {

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
    let login,user;
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) 
      login = <div className="box-login"> <Login registerModal={this.handleShowRegister} /> </div>
	user = <div className = "profile"> <h2> {this.props.user.fname} {this.props.user.lname} {this.props.user.id}</h2> 
		<p> Discipline: {this.props.user.engineer} engineer <br></br>
			Contact information: {this.props.user.email}
		</p></div>
    

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
			<Col mdOffset = {0} xs={10}>
				{user}
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

Body = connect(
  mapStateToProps,
)(Body);

export default Body;
