import React, { Component } from 'react'
import { fetchAPI } from '../../utility'
import Question from './Question'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    try {
      fetchAPI("GET", "/api/qa/questions/?user_id=3").then(response => {
        if (response.success) {
          this.setState({
            questions: response.questions
          })
        }
      })
    } catch (e) { console.error("Error:", e) }
  }

  render() {
    let questions = this.state.questions.map((question) => {
      <Question 
        question={question}
      />
    })
      return (
        <div>
          {questions}
        </div>
      )
  }
}

export default Questions;