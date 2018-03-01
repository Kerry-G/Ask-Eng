import React, { Component } from 'react'
import {fetchAPI} from '../../../utility'
import moment from 'moment'
import FontAwesome from 'react-fontawesome' 
import { Col, Row, Image, ButtonToolbar, DropdownButton, MenuItem, Well } from 'react-bootstrap'
import Answer from './Answer.js'
import AnswerQuestion from './AnswerQuestion'

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state={
        question:{
          answers: []
        },
		check : false
    }
	this.answerhandler = this.answerhandler.bind(this);
  }

  	answerhandler() {
		console.log("question answered");
        this.getQuestion();
    }

  componentDidMount(){
    this.getQuestion()
  }

  async getQuestion() {
    try {
      fetchAPI("GET", "/api/qa/questions/?question_id=" + this.props.match.params.id).then(response => {
        console.log(response.question)
        if (response.success) {
          this.setState({
            question: response.question
          })
        }
      })
    } catch (e) { console.error("Error:", e) }
  }

  render() {
    console.log(this.state.question)
    let answers = this.state.question.answers.map((answer) => {
      return (
        <div key={answer.id}>
          <Answer 
          answer={answer}
           />
        </div>
      )
    })

      return (
		
        <div className="question-box answer-page">
          <Row>
            <Col md={12}>
              <span className="question-tag">{this.state.question.engineer}</span>
            </Col>
          </Row>
          <Row className="question-box-text">
            <Col md={1} xs={2}>
              <div className="square">
                <div className="fontawesomearrow down">
                  <FontAwesome name='chevron-up' />
                </div>
                <div className="points down">
                  {this.state.question.ups}
                </div>
              </div>
              <div className="square">
                <div className="fontawesomearrow up">
                  <FontAwesome name='chevron-down' />
                </div>
                <div className="points up">
                  {this.state.question.downs}
                </div>
              </div>
            </Col>
            <Col md={11} xs={9} right>
              <Well bsSize="large">
                <h1>{this.state.question.title}</h1>
                <p>{this.state.question.text}</p>
              </Well>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <Well bsSize="large">
              <h1> Know the Answer? </h1>
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
    }
}
export default QuestionPage;