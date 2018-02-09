import React, { Component } from 'react'
import { Grid, Col, Row, Modal, Button, FormGroup, FormControl, HelpBlock, ControlLabel, Image, Alert } from 'react-bootstrap'
import Select from 'react-select'
import { fetchAPI } from './../utility'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //form inputs
            lname: '',
            fname: '',
            email: '',
            pw: '',
            role: '',

            //validators
            validEmail: null,
            button: false,

            //alert state
            answer: null,

            page: 1,
            error: false
        }
        this.validateEmail = this.validateEmail.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cleanState = this.cleanState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }
    componentDidUpdate() {
        this.validateButton()
    }
    /*
     * validateEmail check if the string in the email field is 
     * in the form *@*.*
     * Input: mail
     * Output: a string either "success" or "error"
     * @author Kerry Gougeon
     */
    validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            this.setState({
                validEmail: "success"
            })
        } else {
            this.setState({
                validEmail: "error"
            })
        }
    }
    /*
     * validateButton check if all the field are ok 
     * Output: change the state of button to either T/F
     * @author Kerry Gougeon
     */
    validateButton() {
        let result;
        if (this.state.lname !== ''
            && this.state.pw !== ''
            && this.state.role !== ''
            && this.state.fname !== ''
            && this.state.validEmail === 'success') {
            result = false;
        } else {
            result = true;
        }
        if (this.state.button === result) { } else {
            this.setState({
                button: result
            })
        }
    }
    handleClick() {
        this.props.handleClose();
        this.saveUser();
        this.cleanState();
    }
    async saveUser() {
        try {
            let data = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.pw,
                engineer: this.state.role,
                display_image: "1.png"
            }
            fetchAPI("POST", "/api/users/", data).then(response => {
                if (response.success) {
                    this.setState({ answer: response.message })
                }
            }).catch((e) => console.error("Error:", e))
        }
        catch (e) {
            console.error("Error:", e)
        }
    }
    handleClose() {
        this.props.handleClose();
        this.cleanState();
    }
    /*
     * cleanState reset the state of the component
     * Input: a Boolean bool
     * Output: if T, reset but keep the alert. If F, reset everything
     * @author Kerry Gougeon
     */
    cleanState() {
        this.setState({
            lname: '',
            fname: '',
            email: '',
            validEmail: null,
            pw: '',
            role: '',
            button: false,
            answer: null,
            page: 1,
            alert: false,
            error: false
        })
    }

    handleNextPage() {
        let currentPage = this.state.page;
        let data = {
            email: this.state.email
        }
        fetchAPI("POST", "/api/users/email/", data).then((response) => {
            console.log(response);
            if (response.success) {
                this.setState({
                    error: true
                })
            }
            else {
                    currentPage++;
                    this.setState({ page: currentPage })
               }
        }).catch((e) => console.error("Error:", e))
   }

    handlePreviousPage() {
        let currentPage = this.state.page;
        currentPage--;
        this.setState({
            page: currentPage
        })
    }

    render() {
        let options = [
            { value: 'software', label: 'Software Engineering' },
            { value: 'mechanical', label: 'Mechanical Engineering' },
            { value: 'computer', label: 'Computer Engineering' },
            { value: 'electrical', label: 'Electrical Engineering' },
            { value: 'civil', label: 'Civil Engineering' }
        ];

        let body
        if (this.state.page == 1) {
            body =
                <div>
                    <Col xs={12} md={6}>
                        <div className="menu">
                            <FieldGroup
                                type="text"
                                label="E-mail"
                                placeholder="soen341@email.com"
                                value={this.state.email}
                                valid={this.state.validEmail}
                                onChange={(e) => {
                                    this.validateEmail(e.target.value)
                                    this.setState({ email: e.target.value })
                                }}
                            />
                            <FieldGroup
                                label="Password"
                                type="password"
                                placeholder="password"
                                value={this.state.pw}
                                onChange={(e) => this.setState({ pw: e.target.value })}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="picture">
                            <Image src="https://i.imgur.com/cmPoLVn.jpg" responsive rounded />
                        </div>
                    </Col>
                </div>
        }

        else if (this.state.page === 2) {
            body = <div>
                <Col xs={12} md={6}>
                    <div className="menu">
                        <FieldGroup
                            type="text"
                            label="First Name"
                            value={this.state.fname}
                            placeholder="John"
                            onChange={(e) => {
                                this.setState({ fname: e.target.value })
                            }}
                        />
                        <FieldGroup
                            type="text"
                            label="Last Name"
                            placeholder="McQueen"
                            value={this.state.lname}
                            onChange={(e) => {
                                this.setState({ lname: e.target.value })
                            }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="picture">
                        <Image src="https://i.imgur.com/H8wshWs.jpg" responsive rounded />
                    </div>
                </Col>
            </div>
        }
        else if (this.state.page === 3) {
            body = <div>
                <Col xs={12} md={6}>
                    <div className="menu">

                        <ControlLabel>Engineering Field</ControlLabel>
                        <Select
                            name="form-field-name"
                            value={this.state.role}
                            options={options}
                            onChange={(e) => {
                                if (e !== null) {
                                    this.setState({ role: e.value })
                                } else {
                                    this.setState({ role: '' })
                                }
                            }}
                        />


                        <FieldGroup
                            type="file"
                            id="formControlsFile"
                            label="Upload your engineering certificate"
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div className="picture">
                        <Image src="https://i.imgur.com/m06zvaZ.jpg]]]" responsive rounded />
                    </div>
                </Col>
            </div>
        }



        let previousButton, nextButton, saveButton, alert = null;
        if (this.state.page === 1) {
            saveButton = null
            previousButton = null

            if (this.state.error === true) {
                alert = <Alert bsStyle="warning">Invalid email or password!</Alert>
            }
            else {
                alert = null
            }

            nextButton = <Button onClick={this.handleNextPage}>Next</Button>

        }
        else if (this.state.page === 2) {
            saveButton = null
            previousButton = <Button onClick={this.handlePreviousPage}>Previous</Button>
            nextButton = <Button onClick={this.handleNextPage}>Next</Button>
        }
        else if (this.state.page === 3) {
            saveButton = <Button bsStyle="primary" disabled={this.state.button} onClick={this.handleClick}>Save</Button>
            previousButton = <Button onClick={this.handlePreviousPage}>Previous</Button>
            nextButton = null
        }


        return (
            <Modal dialogClassName="custom-modal" show={this.props.show} onHide={this.handleClose}>

                <Modal.Body>

                    <Grid fluid>
                        <Row>
                            {alert}
                            {body}

                        </Row>
                    </Grid>

                </Modal.Body>

                <Modal.Footer>
                    {previousButton}
                    {nextButton}
                    {saveButton}

                </Modal.Footer>
            </Modal>
        );
    }
}

function FieldGroup({ id, label, help, valid, ...props }) {
    return (
        <FormGroup controlId={id} validationState={valid}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}


export default Register;
