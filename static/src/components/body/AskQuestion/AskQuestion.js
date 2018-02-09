import React, { Component } from 'react'
import {  FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Question</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="What is your question?" />
                </FormGroup>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

AskQuestion = connect(
    mapStateToProps,
)(AskQuestion);

export default AskQuestion;
