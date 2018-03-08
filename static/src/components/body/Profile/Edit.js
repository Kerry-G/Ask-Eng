import React, { Component } from 'react'
import { Grid, Col, Row, Modal, FormGroup, FormControl, HelpBlock, ControlLabel, Alert, Popover, OverlayTrigger } from 'react-bootstrap'
import Select from 'react-select'
import { Panel, Glyphicon, Image, Media, Button} from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { connect } from 'react-redux'
import { updateUser, login } from '../../../store/auth'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
			showFnameModal: false,
            fname: this.props.user.fname,

			showLnameModal: false,
            lname: this.props.user.lname,

			showPwModal: false,
			currentpw: '',
			newpw: '',
			verifyemail: '',

			showEmailModal: false,
            email: this.props.user.email,

			showEngineerModal: false,
			eng: this.props.user.engineer,

			verified : true,
			validPassword : false,
			validEmail : true,

        };
		//These handlers are used to determine which modal to show.
		this.handleChange_fname = this.handleChange_fname.bind(this);
		this.handleChange_lname = this.handleChange_lname.bind(this);
		this.handleChange_pass = this.handleChange_pass.bind(this);
		this.handleChange_email = this.handleChange_email.bind(this);
		this.handleChange_eng = this.handleChange_eng.bind(this);

		//Handlers to either submit or close the modal.
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		//Handlers to get user inputs in the modals.
		this.handleFnameChange = this.handleFnameChange.bind(this);
		this.handleLnameChange = this.handleLnameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);

		this.handleCurrentPwChange = this.handleCurrentPwChange.bind(this);
		this.handleEmailPwChange = this.handleEmailPwChange.bind(this);
		this.handleNewPwChange = this.handleNewPwChange.bind(this);

    }

	handleChange_fname(){
		this.setState({ showFnameModal: true })
	}

	handleChange_lname(){
		this.setState({ showLnameModal: true })
	}

	handleChange_pass(){
		this.setState({ showPwModal: true })
	}

	handleChange_email(){
		this.setState({ showEmailModal: true })
	}

	handleChange_eng(){
		this.setState({ showEngineerModal: true})
	}


	//When closing a modal, set all the modal values to false and reset the input values.
	handleClose(){
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
			console.log(response)
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
				console.log(response)
                if (response.success) {
                    console.log(response + "lol")
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
				console.log(response)
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
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20}/.test(pw)) {
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
		//edit is assigned the correct modal to be displayed. options is for the engineering choices. alert will be used
		//to display error messages when attempting to change the password. popoverFocus is used as a focus When
		//entering a new password to remind the user of the constraints. existentEmail will be used to notify the user
		//if the new email entered is already in use.

		let edit,options, alert, popoverFocus, existentEmail;
		options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
        ];
		if (!this.state.verified)
			 alert = <div className="flash animated" id="invalid"><Alert bsStyle="warning">Invalid email or password!</Alert></div>

		popoverFocus = <Popover 
						title="Your password should be safe!" 
						id="popover-basic">
						Your password must contain atleast one lowercase character,
						one uppercase character, one special character "@#$%",
						and atleast 6 characters.</Popover>

		if (!this.state.validEmail)
			existentEmail = <div className="flash animated" id="existentEmail"><Alert bsStyle="warning">Email already in use!</Alert></div>

		if (this.state.showFnameModal == true){
			edit = <Modal dialogClassName="fname_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<Grid fluid>
								<Row>
									First Name
								</Row>
								<Row>
									<textarea
									className="change_fname_textbox"
									rows = "1"
									cols = "45"
									placeholder="Enter your first name here"
									onChange={(e) => this.handleFnameChange(e)} />
								</Row>
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
							<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.fname == this.props.user.fname || this.state.fname==""} onClick={() => this.handleSubmit()}> Submit </Button>
								</Row>
							</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showLnameModal == true){
			edit = <Modal dialogClassName="lname_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<Grid fluid>
								<Row>
									Last name
								</Row>
								<Row>
									<textarea
									className="change_lname_textbox"
									rows = "1"
									cols = "45"
									placeholder="Enter your last name here"
									onChange={(e) => this.handleLnameChange(e)} />
								</Row>
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.lname ==this.props.user.lname || this.state.lname=="" } onClick={() => this.handleSubmit()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showPwModal == true){
			edit = <Modal dialogClassName="pw_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							{alert}
							<Grid fluid>
								<Row>
									Email
								</Row>
								<Row>
									<textarea
									className="textarea_email"
									rows = "1"
									cols = "45"
									placeholder="Enter your email here"
									onChange={(e) => this.handleEmailPwChange(e)} />
								</Row>
								<Row>
									Current password
								</Row>
								<Row>
									<textarea
									className="textarea_current_pw"
									rows = "1"
									cols = "45"
									placeholder="Enter your current password here"
									onChange={(e) => this.handleCurrentPwChange(e)} />
								</Row>
								<Row>
									New Password
								</Row>
								<Row>
									<OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
									<textarea
									className="textarea_new_pw"
									rows = "1"
									cols = "45"
									placeholder="Enter your new password here"
									onChange={(e) => this.handleNewPwChange(e)} />
									</OverlayTrigger>
								</Row>
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.currentpw == "" || !this.state.validPassword || this.state.verifyemail ==""} onClick={()=> this.handleSubmitPassword()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showEmailModal == true){
			edit = <Modal dialogClassName="email_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							{existentEmail}
							<Grid fluid>
								<Row> 
									New Email
								</Row>
								<Row>
									<textarea
									className="change_email_textbox"
									rows = "1"
									cols = "45"
									placeholder="Enter your email here"
									onChange={(e) => this.handleEmailChange(e)} />
								</Row>
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.email==this.props.user.email || this.state.email==""} onClick={() => this.handleSubmitEmail()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showEngineerModal == true){
			edit = <Modal dialogClassName="engineer_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<Grid fluid>
								 <ControlLabel>Select your Engineering Field</ControlLabel>
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
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.eng=="" || this.state.eng==this.props.user.engineer} onClick={() => this.handleSubmit()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

        return (
			//A card that displays user information that can be changed, as well as the appropriate modal (if applicacle).
			<div>
            <Panel bsStyle="primary">
				<Panel.Heading>
					Edit profile
				</Panel.Heading>
				<Panel.Body>
					<a id="change_fname" style={{cursor: 'pointer'}} onClick={() => this.handleChange_fname()}> Change First Name </a><br></br>
					<a id="change_lname" style={{cursor: 'pointer'}} onClick={() => this.handleChange_lname()}> Change Last Name </a><br></br>
					<a id="change_pass" style={{cursor: 'pointer'}} onClick={() => this.handleChange_pass()}> Change Password </a><br></br>
					<a id="change_email" style={{cursor: 'pointer'}} onClick={() => this.handleChange_email()}> Change Email </a><br></br>
					<a id="change_eng" style={{cursor: 'pointer'}} onClick={() => this.handleChange_eng()}> Change Discipline </a><br></br>
				</Panel.Body>
              </Panel>
			  {edit}
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
