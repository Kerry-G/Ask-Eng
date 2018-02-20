import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media } from 'react-bootstrap'
import { fetchAPI } from '../../utility'
import { connect } from 'react-redux'
import ProfileCard from './ProfileCard'
import Question from '..//Questions//Question'


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alert: false,
			user:{},
			questions: [],
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
						this.setState({ alert: false, user:response.user })
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
			fetchAPI("GET", "/api/qa/questions/?").then(response => {
				console.log(response)
				if (response.success) {
					this.setState({
						questions: response.questions
					})
				}
			})
		} catch (e) { console.error("Error:", e) }
	}

	render() {
		let questions = this.state.questions.map((question) => {
			return (
				<div key={question.id}>
					<Question question={question} />
				</div>
			)
		})
		let points = {
			float: "right"
		}
		let avatarPath;
		if (this.state.display_image !== "") {
			avatarPath = "\\images\\avatar\\" + this.state.display_image
		} else {
			avatarPath = "\\images\\avatar\\3.png"
		}
		let ProfileInfo;
		//Own account
		if (!this.state.alert && (this.props.match.params.id === this.state.id)) {
			console.log(this.props.user)
			ProfileInfo = <ProfileCard user={this.props.user} />
			
			
		} else if (!this.state.alert && (!(this.props.match.params.id === this.state.id))) { //viewing another person's profile
		console.log(this.props.user)
			ProfileInfo = <ProfileCard user={this.state.user}/>
		} else { //Profile inexistent
			ProfileInfo = <div> <h1> User was not found. </h1> </div>
		}

		return (
			<div>
				{ProfileInfo}
				{questions}
				
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
