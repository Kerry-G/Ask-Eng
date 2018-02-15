import React, { Component } from 'react'
import { Grid, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import Select from 'react-select'
import { fetchAPI } from '../utility'
import { connect } from 'react-redux'

class Debug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "",
            route: "/api/",
            body: "",
            answer: {}
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.state.body !== "") {
            fetchAPI(this.state.method, this.state.route, this.state.body).then(response => this.setState({ answer: response }))
        } else {
            fetchAPI(this.state.method, this.state.route).then(response => this.setState({ answer: response }))

        }
    }

    render() {
        let options = [
            { value: 'GET', label: 'GET' },
            { value: 'PUT', label: 'PUT' },
            { value: 'POST', label: 'POST' },
            { value: 'DELETE', label: 'DELETE' }
        ]
        let answer = JSON.stringify(this.state.answer)
        return (
            <Grid>
                <form>
                    <Select
                        name="form-field-name"
                        value={this.state.method}
                        options={options}
                        onChange={(e) => {
                            if (e !== null) {
                                this.setState({ method: e.value })
                            } else {
                                this.setState({ method: '' })
                            }
                        }}
                    />
                    <FormGroup
                        controlId="formBasicText"
                    >
                        <ControlLabel>route</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.route}
                            placeholder="Enter text"
                            onChange={(e) => { this.setState({ route: e.target.value }) }}
                        />
                    </FormGroup>
                    <FormGroup
                        controlId="formBasicText"
                    >
                        <ControlLabel>body</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.body}
                            placeholder="Enter text"
                            onChange={(e) => { this.setState({ body: e.target.value }) }}
                        />
                    </FormGroup>
                    <br />
                    <p contenteditable="true">
                        {JSON.stringify({
                            fname: 'kerry',
                            lname: 'gougeon',
                            email: '2@2.com',
                            password: 'pass1234',
                            engineer: 'software engineer',
                            display_image: "1.png"
                        })}
                        <br />
                        {JSON.stringify({
                            email: '2@2.com', password: 'pass1234'
                        })}
                    </p>
                    <br />
                    <Button onClick={this.handleClick}>Submit</Button>
                    <br />
                    <code className="prettyprint">{answer}</code>
                </form>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

Debug = connect(
    mapStateToProps,
)(Debug);

export default Debug;
