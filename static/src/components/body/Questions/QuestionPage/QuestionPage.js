import React, {Component} from 'react'
import {fetchAPI} from '../../../utility'
import moment from 'moment'
import FontAwesome from 'react-fontawesome' 
import { Col, Row, Image, ButtonToolbar, DropdownButton, MenuItem, Well } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import {Col, Row, Image, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'
import Answer from './Answer.js'
import AnswerQuestion from './AnswerQuestion.js'
import Votes from "../../../votes/Votes";

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                answers: []
            },
            loading: true
        }
    }

    componentWillMount() {
        this.setState({loading: true});
        this.getQuestion()
    }

    async getQuestion() {
        try {
            fetchAPI("GET", "/api/qa/questions/?question_id=" + this.props.match.params.id).then(response => {
                if (response.success) {
                    this.setState({
                        question: response.question,
                        loading: false
                    })
                }
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    render() {
        if (!this.state.loading) {
            let answers = this.state.question.answers.map((answer) => {
                return (
                    <div key={answer.id}>
                        <Answer
                            answer={answer}
                        />
                    </div>
                )
            });
            return (
                <div className="question-box answer-page">
                    <Row>
                        <Col md={12}>
                            <span className="question-tag">{this.state.question.engineer}</span>
                        </Col>
                    </Row>
                    <Row className="question-box-text">
                        <Col md={1}>
                            <Votes
                                question={this.state.question}/>
                        </Col>
                        <Col md={11}>
                            <h1>{this.state.question.title}</h1>
                            <p>{this.state.question.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                          <Well bsSize="large">
                          <h1> Know the Answer? </h1>
                            <AnswerQuestion
                                id={this.props.match.params.id}
                            />
                          </Well>
                        </Col>
                    </Row>
                    {answers}
                </div>
            )
        } else {
            return <h2>Loading...</h2>
        }
    }
}

export default QuestionPage;