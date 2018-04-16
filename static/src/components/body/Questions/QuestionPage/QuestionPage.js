import React, { Component } from 'react'
import { fetchAPI } from '../../../utility'
import { Col, Row, Image, Grid } from 'react-bootstrap'
import Answer from './Answer.js'
import AnswerQuestion from './AnswerQuestion.js'
import moment from 'moment'
import Votes from "../../../votes/Votes";
import { connect } from 'react-redux'

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
            loading: true,
            newTags: ""
        }
        this.answerHandler = this.answerHandler.bind(this);
    }

    answerHandler() {
        this.getQuestion()
    }

    componentDidMount() {
        this.getQuestion()
    }

    componentWillMount() {
        this.setState({ loading: true });
    }

    async getQuestion() {
        try {
            fetchAPI("GET", "/api/qa/questions/?question_id=" + this.props.match.params.id + "&loggedin_id=" + this.props.user.id).then(response => {
                if (response.success) {
                    response.question.tags = response.question.tags.split(",")
                    this.setState({
                        question: response.question,
                        loading: false,
                        user_id: response.question.user_id
                    }, () => this.getUser())
                }
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    async getUser() {
        try {
            fetchAPI("GET", "/api/users/" + this.state.user_id).then(response => {
                if (response.success) {
                    console.log(response.user)
                    this.setState({
                        fname: response.user.fname,
                        lname: response.user.lname,
                        display_image: response.user.display_image
                    })
                }
            })
        } catch (e) {
            console.error("Error:", e)
        }
    }

    handleKeyPress(target){
        if(target.charCode===13){
            let data ={
                tags : (this.state.newTags + "," +this.state.question.tags)
            }
            fetchAPI("PUT", "/api/qa/tags/" + this.state.question.id, data).then(res=>{
                this.getQuestion();
            })
        }
    }

    render() {
        let avatarPath = `\\images\\avatar\\` + this.state.display_image;
        let createTags;
        if (!this.state.loading) {
            let userLogin = !((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) //if no user is login
            let askQuestion;
            let answers = this.state.question.answers.map((answer) => {
                return (
                    <div key={answer.id}>
                        <Answer
                            user={this.props.user}
                            answer={answer}
                        />
                    </div>
                )
            });
            console.log(this.state.question)
            // CREATES THE TAGS
            let tagsInfo = this.state.question.tags.map((tag) => {
                if (tag === "") { return null }
                return (
                    <span key={tag} className="question-tags">
                        {tag}
                    </span>
                )
            })
            // CREATES THE ANSWER BOX
            if (userLogin) {
                askQuestion = <Row>

                        <div className="answer-box">
                            <AnswerQuestion
                                id={this.props.match.params.id}
                                updateAnswers={this.answerHandler}
                            />
                        </div>
                </Row>
                if (this.props.user.id === this.state.question.user_id){
                    createTags = <input 
                                    type="text" 
                                    onKeyPress={this.handleKeyPress.bind(this)}
                                    value = {this.state.newTags}
                                    placeholder="enter your tags here"
                                    onChange = {(e)=> this.setState({newTags:e.target.value})}
                                />
                }
            } else { askQuestion = null; }

            return (
                <div className="answer-page">
                    <Grid>
                        <Row>
                            <Col>
                                <span className="question-tag-answer">{this.state.question.engineer}</span>
                                <Image src={avatarPath} width={24} circle /> {this.state.fname} {this.state.lname}
                                &nbsp;- {moment(this.state.question.register_date).format("LLL")}
                                <span className="question-tags-answer">
                                    {tagsInfo}
                                    {createTags}
                                </span>
                            </Col>
                        </Row>
                        <Row className="question-box-text">
                            <Col>
                                <Votes
                                    question={this.state.question}
                                    status={this.state.question.vote_status}
                                    user={this.props.user}
                                    comment_status={'question'}
                                />
                            </Col>
                            <Col>
                                <h1>{this.state.question.title}</h1>
                                <p>{this.state.question.text}</p>
                            </Col>
                        </Row>
                        {askQuestion}
                        <div>
                            {answers}
                        </div>
                    </Grid>
                </div>
            )
        } else {
            return <h2>Loading...</h2>
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

QuestionPage = connect(
    mapStateToProps,
)(QuestionPage);

export default QuestionPage;