import React, {Component} from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfileBody from './body/Profile/ProfileBody';
import {Col, Row, Grid} from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
	}

  render() {

  console.log(this.props.match.params);


   let ProfileInfo;
	 ProfileInfo = <div> <h1> {this.props.user.fname} {this.props.user.lname} </h1>
					<h3>	&nbsp;&nbsp;&nbsp;Discipline: {this.props.user.engineer} engineering <br></br><br></br>
							&nbsp;&nbsp;&nbsp;Contact information: {this.props.user.email}
					</h3>
					<h4> <br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User ID: {this.props.match.params.id} </h4>
	 </div>
    return (
        <div>
            <Header/>
			<ProfileBody/>
			<div>
				<Grid fluid>
					<Row>
						<Col mdOffset = {0} xs={8} lgOffset={1}>
							{ProfileInfo}
						</Col>
					</Row>
				</Grid>
			</div>
            <Footer/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Profile = connect(
  mapStateToProps,
)(Profile);

export default Profile;
