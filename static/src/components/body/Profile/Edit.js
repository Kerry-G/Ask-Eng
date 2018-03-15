import React, { Component, View, Hr } from 'react'
import { Alert, Panel, Col, Media, Button, Row, Form, FormGroup , FormControl, Grid, ControlLabel} from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { updateUser, login } from '../../../store/auth'
import FontAwesome from 'react-fontawesome' 
import { connect } from 'react-redux'
import ChooseAvatar from '../LoginBox/ChooseAvatar'
import ProfileCard from './ProfileCard'
import { Link } from 'react-router-dom'
import Select from 'react-select'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: this.props.user.fname,
            lname: this.props.user.lname,

			currentpw: '',
			newpw: '',
			verifyemail: '',

            email: this.props.user.email,

			eng: this.props.user.engineer,

			verified : true,
			validPassword : false,
			validEmail : true,
        };
		//Handlers to either submit or close the modal.
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);

		//Handlers to get user inputs in the modals.
		this.handleFnameChange = this.handleFnameChange.bind(this);
		this.handleLnameChange = this.handleLnameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleCurrentPwChange = this.handleCurrentPwChange.bind(this);
		this.handleEmailPwChange = this.handleEmailPwChange.bind(this);
		this.handleNewPwChange = this.handleNewPwChange.bind(this);
    }
	
	//When closing a modal, set all the modal values to false and reset the input values.
	handleReset(){
		this.setState({ showFnameModal: false, 
						showLnameModal: false, 
						showPwModal : false,
						showEmailModal : false,
						showEngineerModal: false, 
						fname : this.props.user.fname,
						lname : this.props.user.lname,
						email : this.props.user.email,
						eng : this.props.user.engineer,
						currentpw: '',
						newpw: '',
						verifyemail: '',
						verified: true,
						validPassword : false,
						validEmail: true})
	}

	//Submit and change info (this can change first name, last name or engineering).
	handleSubmit(){
		this.modifyUserInfo()
	}

	//Submit and change email (check if email already exists first).
	handleSubmitEmail(){
		this.checkEmail()
	}

	//Check if email is existent or not. If not, then proceed and modify user information.
	async checkEmail(){
		try {
			let data = {email: this.state.email}

			fetchAPI("POST", '/api/users/email/', data).then(response =>{
			if (response.success){
				this.setState({validEmail: true})
				this.setState({validEmail : false})
				}
			else{
				this.setState({validEmail: true})
				this.modifyUserInfo()
				}
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }
	//Changes user information and reloads the profile card accordingly. This method can change first name, last name,
	//email and engineering discipline. Once changed and submitted, the modal in question is closed.
	async modifyUserInfo() {
        try {
			  let data = {
				user_id: this.props.user.id,
				fname : this.state.fname,
				lname : this.state.lname,
				engineer : this.state.eng,
				email : this.state.email
			}
            fetchAPI("PUT", '/api/users/' + this.props.user.id, data).then(response => {
                if (response.success) {
					let updatedUser = JSON.parse(JSON.stringify(this.props.user))
					updatedUser.fname = data.fname
					updatedUser.lname = data.lname
					updatedUser.engineer = data.engineer
					updatedUser.email = data.email
					updateUser(updatedUser)
					this.handleClose();
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }

	//This submit button is used to change the password.
	handleSubmitPassword(){
		this.modifyPassword()
	}

	//modifyPassword() uses a method from users.py that first checks whether or not the email and current password
	//are valid, then checks if the new password is valid.
	async modifyPassword(){
		try {
			  let data = {
				user_id : this.props.user.id,
				email: this.state.verifyemail,
				oldPassword : this.state.currentpw,
				newPassword : this.state.newpw,
			}
            fetchAPI("PUT", '/api/users/password/' + this.props.user.id, data).then(response => {
                if (response.success) {
					this.setState({verified: true})
					this.handleClose();
                }
				else{
					this.setState({verified : true})
					this.setState({verified : false})
				}
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
	}

	//Method to check if the new password is valid.
	validatePassword(pw) {
        if (pw.length > 6) {
            this.setState({
                validPassword: true
            })
        } else {
            this.setState({
                validPassword: false
            })
        }
    }

	handleFnameChange(e) {
        this.setState({
            fname: e.target.value
        })
    }
	handleLnameChange(e) {
        this.setState({
            lname: e.target.value
        })
    }
	handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
	handleCurrentPwChange(e){
		this.setState({
			currentpw: e.target.value
		})
	}
	handleEmailPwChange(e){
		this.setState({
			verifyemail: e.target.value
		})
	}
	handleNewPwChange(e){
		this.setState({
			newpw: e.target.value
		})
		this.validatePassword(e.target.value)
	}

    render() {
		/* edit is assigned the correct modal to be displayed. options is for the engineering choices. alert will be used
		 * to display error messages when attempting to change the password. popoverFocus is used as a focus When
		 * entering a new password to remind the user of the constraints.  
		 */

		let options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
		];
		let alert = null;
		if (!this.state.verified)
			 alert = <div className="flash animated" id="invalid"><Alert bsStyle="warning">Invalid email or password!</Alert></div>
      
	    let cancel = '/users/' + this.props.user.id;
		return (
			<div>
				<Col lg={8}>
					<Panel bsStyle="primary">
						<Panel.Heading>
						  <Media>
							<Media.Left>
							  Edit Account Information
							</Media.Left>
						  </Media>
						</Panel.Heading>
						<Panel.Body>
						<Grid fluid>
						  <Row style={{borderWidth: '1px', borderColor: 'black'}}>
							<Col sm={4}><b><big>First Name:</big></b></Col>
							<Col sm={4}> <textarea cols="45" rows="1" label="First Name" onChange={(e) => this.handleFnameChange(e)}/></Col>
							<br></br><hr></hr>
						  </Row>
							
						  <Row>
							<Col sm={4}><b><big>Last Name:</big></b> </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="Last Name" onChange={(e) => this.handleLnameChange(e)}/></Col>
							<br></br><hr></hr>
						  </Row>
						  <Row>
							<Col sm={4}><b><big>Email:</big></b><br></br><small>Email must be available</small> </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="Email" onChange={(e) => this.handleEmailChange(e)}/></Col>
							<br></br><br></br><hr></hr>
						  </Row>
						  <Row>
							<Col sm={4}><b><big>Engineering: </big></b></Col>
							<Col sm={5}><Select
								name="form-field-name"
								value={this.state.eng}
								options={options}
								onChange={(e) => {
									if (e !== null) {
										this.setState({ eng: e.value })
									} else {
										this.setState({ eng: '' })
									}
								}}
							/></Col>
							<br></br><br></br><hr></hr>
						  </Row>
						  <Row>
							<Col sm={4}><b><big>Password</big></b> <br></br>Current Password: </Col>
							<Col sm={4}><br></br><textarea cols="45" rows="1" label="Current Password" onChange={(e) => this.handleCurrentPwChange}/></Col>
						  </Row>
						  <Row>
							<Col sm={4}>New Password: </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="New Password" onChange={(e) => this.handleNewPwChange(e)}/></Col>
						  </Row>
						</Grid>
						</Panel.Body>
						<Panel.Footer>
							<Media>
								<Media.Right>
									<Link to={cancel}><Button>Cancel</Button></Link>
									<Button onClick={() => this.handleReset()}>Reset</Button>
									<Button onClick={() => this.handleSubmit()}>Submit</Button> 
								</Media.Right>
							</Media>
						</Panel.Footer>
					 </Panel>
				</Col>
				<Col lg={4} >
					<ProfileCard user={this.props.user}/>
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

Edit = connect(
	mapStateToProps,
)(Edit);


export default Edit;
