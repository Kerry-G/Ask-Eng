import React, { Component } from 'react'
import { Grid, Col, Row, Modal, FormGroup, FormControl, HelpBlock, ControlLabel, Alert, Popover, OverlayTrigger } from 'react-bootstrap'
import Select from 'react-select'
import { Panel, Glyphicon, Image, Media, Button} from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { connect } from 'react-redux'

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

			verified : false,



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


	//When closing a modal, set all the modal values to false, as well as input values.
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
						verified: false})
	}

	//Submit and change info (this can change first name, last name, email or engineering).
	// NOT FUNCTIONAL AT THE MOMENT
	handleSubmit(){
		this.modifyUserInfo();

		this.handleClose();
	}

	//NOT FUNCTIONAL AT THE MOMENT.
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
                    console.log(response)
					console.log("lol")
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }

	//This submit button is used to change the password. It first verifies the email and then current password.
	//NOT FULLY FUNCTIONAL.
	handleSubmitPassword(){
		let user = {email : this.state.verifyemail, password : this.state.currentpw}
		this.authenticate(user)
		if (this.state.verified == true){
			this.modifyPassword()
			this.handleClose()
		}
		
			
	}


	async modifyPassword(){
	
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
	}

	//When changing password, this will verify that email and current password entered in modal is correct.
	async authenticate(user){
		fetchAPI("POST", "/api/users/authenticate/", user).then(
		  response => {
			try{
			  if (response.success){
				this.setState({verified: true})
			  }
			  else{
				this.setState({verified: false})
			  }
			} catch(e){console.error("Error", e)}
		  }
		).catch((e)=>console.error("Error:", e))
	}

    render() {
		//edit is assigned the correct modal to be displayed. options is for the engineering choices.
		let edit,options;
		options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
        ];

		if (this.state.showFnameModal == true){
			edit = <Modal dialogClassName="fname_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<textarea
								className="change_fname_textbox"
								rows = "1"
								cols = "45"
								placeholder="Enter your first name here"
								onChange={(e) => this.handleFnameChange(e)} />
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
								<textarea
								className="change_lname_textbox"
								rows = "1"
								cols = "45"
								placeholder="Enter your last name here"
								onChange={(e) => this.handleLnameChange(e)} />
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
							<textarea
								className="textarea_current_pw"
								rows = "1"
								cols = "45"
								placeholder="Enter your current password here"
								onChange={(e) => this.handleCurrentPwChange(e)} />
							<textarea
								className="textarea_email"
								rows = "1"
								cols = "45"
								placeholder="Enter your email here"
								onChange={(e) => this.handleEmailPwChange(e)} />
							<textarea
								className="textarea_new_pw"
								rows = "1"
								cols = "45"
								placeholder="Enter your new password here"
								onChange={(e) => this.handleNewPwChange(e)} />
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.currentpw == "" || this.state.newpw == "" || this.state.verifyemail ==""} onClick={()=> this.handleSubmitPassword()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showEmailModal == true){
			edit = <Modal dialogClassName="email_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<Grid fluid>
								<textarea
								className="change_email_textbox"
								rows = "1"
								cols = "45"
								placeholder="Enter your email here"
								onChange={(e) => this.handleEmailChange(e)} />
							</Grid>
						 </Modal.Body>
						<Modal.Footer>
						<Grid fluid>
								<Row>
									<Button onClick={()=> this.handleClose()}> Cancel </Button>
									<Button disabled={this.state.email==this.props.user.email || this.state.email==""} onClick={() => this.handleSubmit()}> Submit </Button>
								</Row>
						</Grid>
						</Modal.Footer>
					</Modal>
		}

		else if (this.state.showEngineerModal == true){
			edit = <Modal dialogClassName="engineer_modal" show={true} onHide={this.handleClose}>
						 <Modal.Body>
							<Grid fluid>
								 <ControlLabel>Engineering Field</ControlLabel>
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
					<a id="change_fname" onClick={() => this.handleChange_fname()}> Change First Name </a><br></br>
					<a id="change_lname" onClick={() => this.handleChange_lname()}> Change Last Name </a><br></br>
					<a id="change_pass" onClick={() => this.handleChange_pass()}> Change Password </a><br></br>
					<a id="change_email" onClick={() => this.handleChange_email()}> Change Email </a><br></br>
					<a id="change_eng" onClick={() => this.handleChange_eng()}> Change Discipline </a><br></br>
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
