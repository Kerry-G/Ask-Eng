import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { fetchAPI } from './../../utility'
import { connect } from 'react-redux'

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            engineerTypeCSS: [
                false, false, false, false, false
            ],
            question: {
                title: '',
                text: '',
                engineer: '',
                user_id: this.props.user.id
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAsk = this.handleAsk.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
    }

    // handle functions
    handleClick(type) {
        let currentStateType = this.state.engineerTypeCSS;
        let question = this.state.question;
        currentStateType = [false, false, false, false, false]
        currentStateType[type] = true;
        let typeEngineer=""
        switch(type){
            case 0:
                typeEngineer="Software";
                break;
            case 1:
                typeEngineer="Mechanical";    
                break;
            case 2:
                typeEngineer="Computer";
                break;
            case 3:
                typeEngineer="Electrical";
                break;
            case 4:
                typeEngineer="Civil"
                break;
            default:
                typeEngineer=""
        }
        question.engineer = typeEngineer
        this.setState({
            engineerTypeCSS: currentStateType,
            question: question
        })
    }

    handleQuestionChange(e) {
        let question = this.state.question;
        question.text = e.target.value;
        this.setState({
            question: question
        })
    }

    handleTitleChange(e) {
        let question = this.state.question;
        question.title = e.target.value;
        this.setState({
            question: question
        })
    }

    handleAsk() {
        this.saveQuestion()
        this.cleanState();
    }
    // validateAsk(){

    // }

    async saveQuestion() {
        try {
            console.log(this.state.question)
            fetchAPI("POST", "/api/qa/questions/", this.state.question).then(response => {
                console.log(response)
                if (response.success) {
                    console.log(response)
                }
            }).catch((e) => console.error("Error:" + e))
        } catch (e) {
            console.log("Error: ", e);
        }
    }



    cleanState() {
        this.setState({
            engineerTypeCSS: [
                false, false, false, false, false
            ],
            question: {
                title: '',
                text: '',
                engineer: '',
                user_id: 0
            }
        })
    }

    render() {
        let engineerTypeCSS = this.state.engineerTypeCSS
        return (
            <div className="ask-box main">
                <div>
                    <textarea
                        className="ask-box text"
                        rows="1"
                        placeholder="Title"
                        onChange={(e) => this.handleTitleChange(e)} />
                </div>
                <div>
                <textarea
                    className="ask-box text"
                    rows="5"
                    placeholder="What is your question?"
                    onChange={(e) => this.handleQuestionChange(e)} />
                </div>

                <div className="ask-box-footer">
                    <a className={engineerTypeCSS[0] ? "ask-box type selected" : "ask-box type"}
                        onClick={(e, a = 0) => { this.handleClick(a) }}>Software</a>
                    <a className={engineerTypeCSS[1] ? "ask-box type selected" : "ask-box type"}
                        onClick={(e, a = 1) => { this.handleClick(a) }}>Mechanical</a>
                    <a className={engineerTypeCSS[2] ? "ask-box type selected" : "ask-box type"}
                        onClick={(e, a = 2) => { this.handleClick(a) }}>Computer</a>
                    <a className={engineerTypeCSS[3] ? "ask-box type selected" : "ask-box type"}
                        onClick={(e, a = 3) => { this.handleClick(a) }}>Electrical</a>
                    <a className={engineerTypeCSS[4] ? "ask-box type selected" : "ask-box type"}
                        onClick={(e, a = 4) => { this.handleClick(a) }}>Civil</a>
                    <Button  id="ask-box-button" bsStyle="primary" onClick={() => this.handleAsk()}>Ask</Button>
                </div>
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
