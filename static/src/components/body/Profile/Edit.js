import React, { Component} from 'react'
import { Alert, Panel, Col, Media, Button, Row, FormControl, Grid,} from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { updateUser } from '../../../store/auth'
import { connect } from 'react-redux'
import ChooseAvatar from '../LoginBox/ChooseAvatar'
import ProfileCard from './ProfileCard'
import Select from 'react-select'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: this.props.user.fname,
            lname: this.props.user.lname,

			currentpw: '',
			newpw: '',
			verifynewpw: '',

            email: this.props.user.email,
			eng: this.props.user.engineer,

			validPassword : true,
			matchingPasswords : true,
			availableEmail : true,
			validEmail : true,

			showAvatar: false,

			passwordChanged : false,
			emailVerified: false,
			processing: false,
			submitted: false,
        };
		//Handlers to either submit or close the modal.
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);

		//Handlers to get user inputs in the modals.
		this.handleFnameChange = this.handleFnameChange.bind(this);
		this.handleLnameChange = this.handleLnameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleCurrentPwChange = this.handleCurrentPwChange.bind(this);
		this.handleNewPwChange = this.handleNewPwChange.bind(this);
		this.handleVerifyNewPwChange = this.handleVerifyNewPwChange.bind(this);

		//Handler that closes avatar modal.
        this.handleCloseAvatar = this.handleCloseAvatar.bind(this);
    }
	
	//When closing a modal, set all the modal values to false and reset the input values.
	handleReset(){
		document.getElementById("modify_profile").reset();
		this.setState({ fname : this.props.user.fname,
						lname : this.props.user.lname,
						email : this.props.user.email,
						eng : this.props.user.engineer,
						currentpw: '',
						newpw: '',
						verifynewpw: '',
						validPassword : true,
						matchingPasswords : true,
						validEmail: true,
						availableEmail : true,
						processing: false,
						submitted: false,
						})
	}

	//Handler closes the avatar modal.
	handleCloseAvatar() {
		this.setState({ showAvatar: false });
    }

	//Submit and
	handleSubmit(){
		this.setState({processing: true, submitted: true})
		//Modifying email cases.
		//Case 1: Email entered is valid and is not the original email.
		if (this.state.validEmail && this.state.email !== this.props.user.email){
			this.checkEmail()
		}
		//Case 2: Email entered is not valid.
		else if (!this.state.validEmail){
			this.setState({emailVerified: false}, function(){
				this.endSubmission()
			})
		}
		//Case 3: No new email is entered.
		else if (this.state.email === this.props.user.email)
			this.setState({emailVerified: true}, function(){
				this.modifyingPassword()
			})
		else
			this.modifyingPassword()
	}

	modifyingPassword(){

		//modifying password cases. Case 1: all fields are entered, new password is valid and new passwords match.
		if (this.state.currentpw!=='' && this.state.newpw!=='' && this.state.verifynewpw!=='' && this.state.matchingPasswords && this.state.validPassword){
			this.modifyPassword()
		}
		//Case 2: At least one of the fields is empty, or the new passwords do not match, or the new password is not valid.
		else if (((this.state.currentpw!=='' || this.state.newpw !=='' || this.state.verifynewpw!=='') && (this.state.currentpw==='' || this.state.newpw==='' || this.state.verifynewpw==='')) || !this.state.validPassword || !this.state.matchingPasswords){
			this.setState({passwordChanged: false}, function(){
				this.endSubmission()
			})
		}
		//Case 3: All the fields are empty and the password is not to be changed.
		else
			this.setState({passwordChanged: true}, function(){
				this.modifyingInfo()
			})
	}

	modifyingInfo(){
		//Modifying rest of information (fname, lname, engineering). All cases check that email and password changes were successful.
		//Case 1: At least of the fields is not empty. Mark the end of the submission by setting 'processing' to false.
		if (this.state.passwordChanged && this.state.emailVerified && (this.state.fname !== this.props.user.fname || this.state.lname !== this.props.user.lname || this.state.eng !== this.props.user.engineer || this.state.email !== this.props.user.email) ){
			this.modifyUserInfo()
			this.setState({processing: false})
		}
		//Case 2: No fields entered. Mark the end of submission by setting 'processing' to false.
		else
			this.setState({processing: false})
	}

	//Check if email is existent or not. If not, then proceed and modify user information.
	async checkEmail(){
		try {
			let data = {email: this.state.email}

			fetchAPI("POST", '/api/users/email/', data).then(response =>{
			if (response.success){
				this.setState({avilableEmail: true})
				this.setState({availableEmail : false})
				this.setState({emailVerified: false})
				this.endSubmission()
				}
			else{
				this.setState({availableEmail: true, emailVerified: true})
				this.modifyingPassword()
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
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }

	//modifyPassword() uses a method from users.py that checks whether or not the email and current password
	//are valid. If the current password entered is incorrect, this will fail.
	async modifyPassword(){
		try {
			  let data = {
				user_id : this.props.user.id,
				email: this.props.user.email,
				oldPassword : this.state.currentpw,
				newPassword : this.state.newpw,
			}
            fetchAPI("PUT", '/api/users/password/' + this.props.user.id, data).then(response => {
                if (response.success) {
					this.setState({passwordChanged: true})
					this.modifyingInfo()
                }
				else{
					this.setState({passwordChanged : true})
					this.setState({passwordChanged : false})
					this.endSubmission()
				}
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
	}

	endSubmission(){
		this.setState({processing: false})
	}

	//Method to check whether or not the new email is of correct format.
	validateEmail(mail) {
		/* eslint-disable*/
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		/* eslint-enable*/	
			this.setState({
                validEmail: true
            })
        } else {
            this.setState({
                validEmail: false
            })
		}
		
    }

	//Method to check if the new password is valid.
	validatePassword(pw) {
        if (pw.length >= 6) {
            this.setState({
                validPassword: true
            })
        } else {
            this.setState({
                validPassword: false
            })
        }
    }

	//Method to check if the new password and re-entered new password match. 
	passwordMatching(pw1, pw2){
		if (pw1===pw2)
			this.setState({matchingPasswords : true})
		else
			this.setState({matchingPasswords : false})
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
		this.validateEmail(e.target.value)
    }
	handleCurrentPwChange(e){
		this.setState({
			currentpw: e.target.value
		})
	}

	handleNewPwChange(e){
		this.setState({
			newpw: e.target.value
		})
		this.validatePassword(e.target.value)
		this.passwordMatching(this.state.verifynewpw, e.target.value)
	}
	
	handleVerifyNewPwChange(e){
		this.setState({
			verifynewpw: e.target.value
		})
		this.passwordMatching(e.target.value, this.state.newpw)
	}

    render() {
		let options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
		];
		let process = null;
		if (this.state.processing)
			process = <div className="flash animated" id="processing"><Alert bsStyle="info">Processing Request...</Alert></div>
		let alert = null;

		if ((!this.state.passwordChanged ||!this.state.emailVerified) && !this.state.processing && this.state.submitted)
			 alert = <div className="flash animated" id="invalid"><Alert bsStyle="warning">Invalid email or password!</Alert></div>
      
		let updated = null;
		if (this.state.passwordChanged && alert==null && this.state.emailVerified  && !this.state.processing && this.state.submitted){
			 updated = <div className="flash animated" id="sucess"><Alert bsStyle="success">Updated Information!</Alert></div>
		}

		let userState=null;
		if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object))
			userState = <div> <big>You must be logged in to view this page.</big> </div>
		else
			userState=	<div>
							<Col lg={8}>
								<form id="modify_profile">
								<Panel bsStyle="primary">
									<Panel.Heading>
										<Media>
										<Media.Left>
											Edit Account Information
										</Media.Left>
										</Media>
									</Panel.Heading>
									<Panel.Body>
									{process}
									{alert}
									{updated}
									<Grid fluid>
										<Row>{/*Change first name*/}
											<Col sm={4}>
												<b><big>First Name:</big></b>
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} label="First Name" onChange={(e) => this.handleFnameChange(e)}/>
											</Col>
											<br/><hr></hr>
										</Row>
										<Row>{/*Change last name*/}
											<Col sm={4}>
												<b><big>Last Name:</big></b>
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} label="Last Name" onChange={(e) => this.handleLnameChange(e)}/>	
											</Col>
											<br/><hr></hr>
										</Row>
										<Row>{/*Change email*/}
											<Col sm={4}>
												<b><big>Email:</big></b><br/><small>Email must be available.</small>
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} label="Email" onChange={(e) => this.handleEmailChange(e)}/>
											</Col>
											<br/><br/><hr></hr>
										</Row>
										<Row>{/*Change engineering*/}
											<Col sm={4}>
												<b><big>Engineering:</big></b>
											</Col>
											<Col sm={5}>
												<Select
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
												/>
											</Col>
											<br/><br/><hr></hr>
										</Row>
										<Row>{/*Change avatar*/}
											<Col sm={4}>
												<b><big>Avatar:</big></b>
											</Col>
											<Col sm={4}>
												<Button onClick={() => this.setState({showAvatar : true})}>Click to change avatar</Button>
												<ChooseAvatar 
													show={this.state.showAvatar}
													user = {this.props.user}
													handleClose={this.handleCloseAvatar}
												/>
											</Col>
											<br/><br/><hr></hr>
										</Row>
										<Row>{/*Change password*/}
											<Col sm={4}>
												<b><big>Password</big></b><br/><small>Password must be at least 6 characters.</small> 
											</Col>

										</Row>
										<Row>
											<br/>
											<Col sm={4}>
												Current password:
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} type="password" onChange={(e) => this.handleCurrentPwChange(e)}/>
											</Col>
										</Row>
										<Row>
											<br/>
											<Col sm={4}>
												New password:
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} type="password" onChange={(e) => this.handleNewPwChange(e)}/>
											</Col>
										</Row>
										<Row>
											<br/>
											<Col sm={4}>
												Re-enter new password: 
											</Col>
											<Col sm={4}>
												<FormControl style={{height:'30px', width:'100%'}} type="password" onChange={(e) => this.handleVerifyNewPwChange(e)}/>
											</Col>
											<br/><br/>
										</Row>
									</Grid>
									</Panel.Body>
									<Panel.Footer>
										<Media>
											<Col sm={12} xs={12} lg={12}>
												<Button  className = "reg-btn-color" onClick={() => this.handleReset()}>Reset form</Button>
												<Button style={{float: "right"}} className = "reg-btn-color" onClick={() => this.handleSubmit()}>Submit</Button> 
											</Col>
										</Media>
									</Panel.Footer>
									</Panel>
									</form>
							</Col>
							<Col lg={4} >
								<ProfileCard user={this.props.user}/>
							</Col>
						</div>

		return (
			<div>{userState}</div>
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
