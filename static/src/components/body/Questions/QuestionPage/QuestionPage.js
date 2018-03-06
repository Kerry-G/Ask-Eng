import React, {Component} from 'react'
import {fetchAPI} from '../../../utility'
import {Col, Row, Well, Image} from 'react-bootstrap'
import Answer from './Answer.js'
import AnswerQuestion from './AnswerQuestion.js'
import moment from 'moment'
import Votes from "../../../votes/Votes";

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                answers: []
            },
            fname: "",
            lname: "",
            display_image: "",
            user_id: "",
            loading: true
        }
		this.answerhandler = this.answerhandler.bind(this);
    }
	
	answerhandler() {
		console.log("question answered");
        this.getQuestion();
        this.getUser();
    }

	componentDidMount(){
        this.getQuestion()
        this.getUser()
	}
	
    componentWillMount() {
        this.setState({loading: true});
        this.getQuestion()
        this.getUser()
    }

    async getQuestion() {
        try {
            fetchAPI("GET", "/api/qa/questions/?question_id=" + this.props.match.params.id).then(response => {
                if (response.success) {
                    this.setState({
                        question: response.question,
                        loading: false,
                        user_id: response.question.user_id
                    })
                }
                console.log(response)
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    async getUser() {
        try {
            fetchAPI("GET", "/api/users/1").then(response => { // find how to route to user_id
                if (response.success) {
                    this.setState({
                        fname: response.user.fname,
                        lname: response.user.lname,
                        display_image: response.user.display_image
                    })
                }
                console.log(response)
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    render() {
        let avatarPath = `\\images\\avatar\\`;
        if (!this.state.loading) {
            let answers = this.state.question.answers.map((answer) => {
                return (
                    <div key={answer.id}>
                        <Answer
                            answer={answer}
                        />
                    </div>
                )            });
            return (
                <div className="answer-page">
                    <Row>
                        <Col md={12}>
                            <span className="question-tag">{this.state.question.engineer}</span>
                            posted on {moment(this.state.question.register_date).format("LL")} <br/>
                            by {this.state.fname} {this.state.lname}
                        </Col>
                    </Row>
                    <Row className="question-box-text">
                        <Col xs={1} md={1}>
                            <Votes
                                question={this.state.question}
                                user={this.props.user}
                            />
                        </Col>
                        <Col xs={11} md={11}>
                            <h1>{this.state.question.title}</h1>
                            <p>{this.state.question.text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Well bsSize="large">
                                <h2> Know the Answer? </h2>
                                <AnswerQuestion
                                id={this.props.match.params.id}
								updateanswers={this.answerhandler}
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