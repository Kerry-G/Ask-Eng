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
			verifynewpw: '',

            email: this.props.user.email,
			eng: this.props.user.engineer,

			validPassword : false,
			matchingPasswords : true,
			validEmail : true,
			verified : true,

			showAvatar: false,

			success: false,
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
		this.setState({ fname : this.props.user.fname,
						lname : this.props.user.lname,
						email : this.props.user.email,
						eng : this.props.user.engineer,
						currentpw: '',
						newpw: '',
						verifynewpw: '',
						verified: true,
						validPassword : false,
						matchingPasswords : true,
						validEmail: true})
	}

	//Handler closes the avatar modal.
	handleCloseAvatar() {
		this.setState({ showAvatar: false });
    }

	//Submit and change info (this can change first name, last name or engineering).
	handleSubmit(){
		if (this.state.newpw != '' || this.state.currentpw !='' || this.state.verifynewpw !='')
			this.modifyPassword()
		else{
			this.setState({success: true})
			}

		if (this.state.email != this.props.user.email)
			this.checkEmail();
		else{
			this.setState({success: true})
			}

		if ((this.state.fname != this.props.user.fname || this.state.lname != this.props.user.lname || this.state.eng != this.props.user.engineer) && this.state.email==this.props.user.email )
			this.modifyUserInfo();
	}		

	//Check if email is existent or not. If not, then proceed and modify user information.
	async checkEmail(){
		try {
			let data = {email: this.state.email}

			fetchAPI("POST", '/api/users/email/', data).then(response =>{
			if (response.success){
				this.setState({validEmail: true})
				this.setState({validEmail : false})
				this.setState({success: false})
				}
			else{
				this.setState({validEmail: true, success: true})
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
                if (response.success && this.state.success ) {
					let updatedUser = JSON.parse(JSON.stringify(this.props.user))
					updatedUser.fname = data.fname
					updatedUser.lname = data.lname
					updatedUser.engineer = data.engineer
					updatedUser.email = data.email
					updateUser(updatedUser)
					this.handleReset();
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }

	//modifyPassword() uses a method from users.py that first checks whether or not the email and current password
	//are valid, then checks if the new password is valid.
	async modifyPassword(){
		try {
			  let data = {
				user_id : this.props.user.id,
				email: this.props.user.email,
				oldPassword : this.state.currentpw,
				newPassword : this.state.newpw,
			}
            fetchAPI("PUT", '/api/users/password/' + this.props.user.id, data).then(response => {
                if (response.success && this.state.matchingPasswords && this.state.validPassword) {
					this.setState({verified: true})
					this.setState({success: true})
                }
				else{
					this.setState({verified : true})
					this.setState({verified : false})
					this.setState({success: false})
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

	handleNewPwChange(e){
		this.setState({
			newpw: e.target.value
		})
		this.validatePassword(e.target.value)
	}
	
	handleVerifyNewPwChange(e){
		this.setState({
			verifynewpw: e.target.value
		})
		if (e.target.value == this.state.newpw)
			this.setState({matchingPasswords : true})
		else
			this.setState({matchingPasswords : false})
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
		if (!this.state.verified || !this.state.validEmail)
			 alert = <div className="flash animated" id="invalid"><Alert bsStyle="warning">Invalid email or password!</Alert></div>
      
		let updated = null;
		if (this.state.success)
			 updated = <div className="flash animated" id="invalid"><Alert bsStyle="success">Updated Information!</Alert></div>

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
						{alert}
						{updated}
						<Grid fluid>
						  <Row>{/*Change first name*/}
							<Col sm={4}><b><big>First Name:</big></b></Col>
							<Col sm={4}> <textarea cols="45" rows="1" label="First Name" onChange={(e) => this.handleFnameChange(e)}/></Col>
							<br></br><hr></hr>
						  </Row>
							
						  <Row>{/*Change last name*/}
							<Col sm={4}><b><big>Last Name:</big></b> </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="Last Name" onChange={(e) => this.handleLnameChange(e)}/></Col>
							<br></br><hr></hr>
						  </Row>
						  <Row>{/*Change email*/}
							<Col sm={4}><b><big>Email:</big></b><br></br><small>Email must be available</small> </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="Email" onChange={(e) => this.handleEmailChange(e)}/></Col>
							<br></br><br></br><hr></hr>
						  </Row>
						  <Row>{/*Change engineering*/}
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
						  <Row>{/*Change avatar*/}
							<Col sm={4}><b><big>Avatar:</big></b></Col>
							<Col sm={4}><Button onClick={() => this.setState({showAvatar : true})}>Click to Change Avatar</Button>
								<ChooseAvatar 
									show={this.state.showAvatar}
									user = {this.props.user}
									handleClose={this.handleCloseAvatar}
								/>
							</Col>
							<br></br><hr></hr>
						  </Row>
						  <Row>{/*Change password*/}
							<Col sm={4}><b><big>Password</big></b><br></br><small>Password must be at least 6 characters.</small> <br></br><br></br>Current Password: </Col>
							<Col sm={4}><br></br><br></br><br></br><textarea cols="45" rows="1" label="Current Password" onChange={(e) => this.handleCurrentPwChange}/></Col>
						  </Row>
						  <Row>
							<Col sm={4}>New Password:</Col>
							<Col sm={4}><textarea cols="45" rows="1" label="New Password" onChange={(e) => this.handleNewPwChange(e)}/></Col>
						  </Row>
						  <Row>
							<Col sm={4}>Re-enter New Password: </Col>
							<Col sm={4}><textarea cols="45" rows="1" label="New Password2" onChange={(e) => this.handleVerifyNewPwChange(e)}/></Col>
						  </Row>
						</Grid>
						</Panel.Body>
						<Panel.Footer>
							<Media>
								<Media.Right>
									<Link to={cancel}><Button>Return To Profile</Button></Link>
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
