import React, { Component } from 'react'
import { Col, Nav, NavItem, NavDropdown, MenuItem, Grid } from 'react-bootstrap'
import { fetchAPI } from '../../utility'
import { connect } from 'react-redux'
import ProfileCard from './ProfileCard'
import Question from '..//Questions//Question'
import Search from '..//Questions//Search'


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
			fetchAPI("GET", "/api/qa/questions/?loggedin_id=" + this.props.user.id + "&user_id="+ this.props.match.params.id + this.state.extraQuery).then(response => {
				if (response.success) {
					this.setState({
						questions: response.questions
					})
				}
			})
		} catch (e) { console.error("Error:", e) }
	}

	handleSearch(word){
		try{
		  let results = [];
		  fetchAPI("GET", "/api/qa/questions/?loggedin_id=" + this.props.user.id + "&user_id="+ this.props.match.params.id + this.state.extraQuery).then(response => {
			if (response.success) {
			  let questions = response.questions
			  for (let i in questions){
				if (questions[i].title.includes(word.value)){
				  results.push(questions[i])
				}
			  }
			  this.setState({
				questions: results
			  })
			}
		  })}
		  catch(e){console.error("Error: ", e)}
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
		if (!this.state.alert && (this.props.match.params.id === this.props.user.id)) {
			ProfileInfo = <div> 
				<ProfileCard user={this.props.user} />
			 </div> 
		} else if (!this.state.alert && (!(this.props.match.params.id === this.state.id))) { //viewing another person's profile
			ProfileInfo = <ProfileCard user={this.state.user} />
		} else { //Profile inexistent
			ProfileInfo = <div> <h1> User was not found. </h1> </div>
		}

		return (
			<div>
				<Grid>
					<Col lg={8}>
					<Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
						<NavItem onClick={() => { this.setState({ activeQuery: "0" }) }} eventKey="0">
							Question
						</NavItem>
						<NavDropdown eventKey="6" title="Sort" id="nav-dropdown">
							<MenuItem onClick={() => this.setState({ extraQuery: "&sort=title" })} eventKey="6.1">Title</MenuItem>
							<MenuItem onClick={() => this.setState({ extraQuery: "&sort=register_date&reverse=1" })} eventKey="6.2">Newest</MenuItem>
							<MenuItem onClick={() => this.setState({ extraQuery: "&sort=register_date&reverse=0" })} eventKey="6.3">Oldest</MenuItem>
							<MenuItem onClick={()=>this.setState({extraQuery:"&sort=downs"})} eventKey="6.4">Ups</MenuItem>
							<MenuItem onClick={()=>this.setState({extraQuery:"&sort=ups"})} eventKey="6.5">Downs</MenuItem>
						</NavDropdown>
						<Search
							handleSearch={(word) => this.handleSearch(word)}
						/>
					</Nav>
						{questions}
						<br/>
					</Col>
					<Col lg={4} >
						{ProfileInfo}
					</Col>
				</Grid>
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
