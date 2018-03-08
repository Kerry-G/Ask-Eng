import React, { Component } from 'react'
import { Alert, Panel } from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { updateUser, login } from '../../../store/auth'
import EditLink from './EditLink.js'
import EditModal from './EditModal.js'

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
        return (
			//A card that displays user information that can be changed, as well as the appropriate modal (if applicacle).
			<div className="box-edit-profile">
            <Panel bsStyle="primary">
				<Panel.Heading>
					Edit profile
				</Panel.Heading>
				<Panel.Body>
					<div id="box-edit-links">
						<EditLink
							id="change-fname"
							onClick={()=>this.handleChange_fname()}
							title="First Name"
						/>
						<EditLink
							id="change-lname"
							onClick={()=>this.handleChange_lname()}
							title="Last Name"
						/>
						<EditLink
							id="change-pass"
							onClick={()=>this.handleChange_pass()}
							title="Password"
						/>
						<EditLink
							id="change-eng"
							onClick={()=>this.handleChange_eng()}
							title="Discipline"
						/>
					</div>
				</Panel.Body>
			</Panel>
			{/* First Name */}
			<EditModal
				show={this.state.showFnameModal}
				onHide={this.handleClose}
				alert = {alert}
				regularInput = {true}
				inputs={[{
					title:"First name",
					className: "change_fname_textbox",
					placeholder: "Enter your first name here",
					onChange: (e)=> this.handleFnameChange(e)
				}]}
				disabled={this.state.fname === this.props.user.fname || this.state.fname === ""}
				onClick={() => this.handleClose()}
				handleSubmit={() => this.handleSubmit()}
			/>
			{/* Last Name */}
			<EditModal
				show={this.state.showLnameModal}
				onHide={this.handleClose}
				alert = {alert}
				regularInput = {true}
				inputs={[{
					title:"Last name",
					className: "change_lname_textbox",
					placeholder: "Enter your last name here",
					onChange: (e)=> this.handleLnameChange(e)
				}]}
				disabled={this.state.lname === this.props.user.lname || this.state.lname === ""}
				onClick={()=>this.handleClose()}
				handleSubmit={() => this.handleSubmit()}
			/>
			{/* Password */}
			<EditModal	
				show={this.state.showPwModal}
				onHide={this.handleClose}
				alert = {alert}
				regularInput = {true}
				inputs={[{
						title:"Email",
						className: "textarea_email",
						placeholder: "Enter your email here",
						onChange: (e)=> this.handleEmailPwChange(e)
					},{
						title:"Current Password",
						className: "textarea_current_pw",
						placeholder: "Enter your first name here",
						onChange: (e)=> this.handleCurrentPwChange(e)
					},{
						overlay: true,
						title: "New Password",
						className: "textarea_new_pw",
						placeholder: "Enter your first name here",
						onChange: (e)=> this.handleNewPwChange(e)
				}]}
				disabled={this.state.currentpw === "" || !this.state.validPassword || this.state.verifyemail ===""}
				onClick={()=>this.handleClose()}
				handleSubmit={() => this.handleSubmit()}
			/>
			{/* Engineering modal */}
			<EditModal	
				show={this.state.showEngineerModal}
				onHide={this.handleClose}
				alert = {alert}
				regularInput = {false}
				label = "Select your Engineering Field"
				selectname = "form-field-name"
				eng = {this.state.eng}
				options = {options}
				onChange = {(e) => {
					if (e !== null) {
						this.setState({ eng: e.value })
					} else {
						this.setState({ eng: '' })
					}
				}}
				disabled={this.state.eng === "" || this.state.eng === this.props.user.engineer}
				onClick={()=>this.handleClose()}
				handleSubmit={() => this.handleSubmit()}
			/>
			</div>
        );
    }
}

export default Edit;
