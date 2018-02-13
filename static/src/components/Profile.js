import React, {Component} from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfileBody from './body/Profile/ProfileBody';
import {Col, Row, Grid} from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {fetchAPI} from './utility'


class Profile extends Component {
  constructor(props) {
    super(props);
	this.state = {
		alert: false,
		email: "",
		fname: "",
		lname: "",
		engineer: "",
		}
	}
	
	 componentDidMount() {
      this.fetchUserInfo()
    }

	//fetches info on the user. Uses the id in the URL to find the user in the database and sets the corresponding state values to be
	//displayed
	 async fetchUserInfo(){
    fetchAPI("GET", "/api/users/" + this.props.match.params.id).then(
      response => {
        try{
          if (response.success){
		  console.log(response.user)
				this.setState({alert: false, email: response.user.email, fname: response.user.fname, lname: response.user.lname, engineer: response.user.engineer})
          }
          else{
            this.setState({alert: true})

          }
        } catch(e){console.error("Error", e)}
      }
    ).catch((e)=>console.error("Error:", e))
  }

  render() {
  console.log(this.props.match.params);
	
	let ProfileInfo;
	 ProfileInfo = <div> <h1> {this.state.fname} {this.state.lname} </h1>
					<h3>	&nbsp;&nbsp;&nbsp;Discipline: {this.state.engineer} engineering <br></br><br></br>
							&nbsp;&nbsp;&nbsp;Contact information: {this.state.email}
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
