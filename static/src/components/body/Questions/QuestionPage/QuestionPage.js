import React, { Component } from 'react'
import {fetchAPI} from '../../../utility'
import moment from 'moment'

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state={
        question:{}
    }
  }

  componentDidMount(){
    this.getQuestions()
  }

  async getQuestions() {
    try {
      fetchAPI("GET", "/api/qa/questions/?question_id=14").then(response => {
        if (response.success) {
          this.setState({
            question: response.question
          })
        }
      })
    } catch (e) { console.error("Error:", e) }
  }

  render() {
      return (
          <div>
              {this.state.question.title}
        </div>
      )
    }
}


export default QuestionPage;
