import React, { Component } from 'react'
import { Col, Nav, NavItem, NavDropdown, MenuItem, Panel, Glyphicon, Image, Media  } from 'react-bootstrap'
import { fetchAPI } from '../../utility'
import { connect } from 'react-redux'
import ProfileCard from './ProfileCard'
import Question from '..//Questions//Question'
import Edit from './Edit'


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: false,
			user: {},
			questions: [],
			activeKey:"0",
			activeQuery:"0",
			extraQuery:""
		}
	}

	componentDidMount() {
		this.fetchUserInfo()
		this.getQuestions()
	}

	//fetches info on the user. Uses the id in the URL to find the user in the database and sets the corresponding state values to be
	//displayed
	async fetchUserInfo() {
		fetchAPI("GET", "/api/users/" + this.props.match.params.id).then(
			response => {
				try {
					if (response.success) {
						this.setState({ alert: false, user: response.user })
					}
					else {
						this.setState({ alert: true })

					}
				} catch (e) { console.error("Error", e) }
			}
		).catch((e) => console.error("Error:", e))
	}

	async getQuestions() {
		try {
			let engineerArray = ["","&engineer=Software","&engineer=Mechanical","&engineer=Computer","&engineer=Electrical","&engineer=Civil"]
      //fetchAPI("GET", "/api/qa/questions/?" + engineerArray[(this.state.activeQuery)] + this.state.extraQuery).then(response => {
			fetchAPI("GET", "/api/qa/questions/?loggedin_id" +  "=" + this.props.user.id).then(response => {
				console.log(response)
				if (response.success) {
					this.setState({
						questions: response.questions
					})
				}
			})
		} catch (e) { console.error("Error:", e) }
	}

	handleSelect(eventKey) {
		this.setState({
		  activeKey:eventKey
		},()=>{this.getQuestions()} )
		
	  }
	render() {
		let questions = this.state.questions.map((question) => {
			return (
				<div key={question.id}>
					<Question question={question} user={this.props.user} />
				</div>
			)
		})
		let ProfileInfo;
		//Own account
		if (!this.state.alert && (this.props.match.params.id == this.props.user.id)) {
			console.log(this.props.user)
			ProfileInfo = <div> 
				<ProfileCard user={this.props.user} />
			 	<Edit user={this.props.user}/> 
			 </div> 


		} else if (!this.state.alert && (!(this.props.match.params.id === this.state.id))) { //viewing another person's profile
			console.log(this.props.user)
			ProfileInfo = <ProfileCard user={this.state.user} />
		} else { //Profile inexistent
			ProfileInfo = <div> <h1> User was not found. </h1> </div>
		}

		return (
			<div>
				<Col lg={8}>
				<Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
					<NavItem onClick={() => { this.setState({ activeQuery: "0" }) }} eventKey="0">
						Question
			</NavItem>
					<NavItem onClick={() => { this.setState({ activeQuery: "2" }) }} eventKey="1" >
						Answer
			</NavItem>
					<NavDropdown eventKey="6" title="Sort" id="nav-dropdown">
						<MenuItem onClick={() => this.setState({ extraQuery: "&sort=title" })} eventKey="6.1">Title</MenuItem>
						<MenuItem onClick={() => this.setState({ extraQuery: "&sort=register_date&reverse=1" })} eventKey="6.2">Newest</MenuItem>
						<MenuItem onClick={() => this.setState({ extraQuery: "&sort=register_date&reverse=0" })} eventKey="6.3">Oldest</MenuItem>
						<MenuItem eventKey="6.4">Ups</MenuItem>
						<MenuItem eventKey="6.5">Downs</MenuItem>
					</NavDropdown>
				</Nav>
					{questions}
				</Col>
				<Col lg={4} >
					{ProfileInfo}
				</Col>
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
