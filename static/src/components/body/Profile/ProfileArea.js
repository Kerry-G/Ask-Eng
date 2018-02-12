import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
class ProfileArea extends Component {

  constructor(props) {
    super(props);
	}

  render() {
	console.log(this.props);
    let user; 
	 user = <div> <h1> {this.props.user.fname} {this.props.user.lname} </h1>
					<h3>	&nbsp;&nbsp;&nbsp;Discipline: {this.props.user.engineer} engineering <br></br><br></br>
							&nbsp;&nbsp;&nbsp;Contact information: {this.props.user.email}
					</h3>
					<h4> <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User ID: {this.props.user.id} </h4>
	 </div>

    return (
      <div>
        <Grid fluid>
          <Row>
            <Col mdOffset={0} xs={12}  lgOffset={2} lg={8}>
            </Col>
          </Row>
        </Grid>
		<Grid fluid>
			<Row>
			<Col mdOffset = {0} xs={8} lgOffset={1}>
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

ProfileArea = connect(
  mapStateToProps,
)(ProfileArea);

export default ProfileArea;
