import React, { Component } from 'react'
import { fetchAPI } from '../../utility'
import { Nav, NavItem } from 'react-bootstrap'
import Question from './Question'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeKey:"1"
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    try {
      fetchAPI("GET", "/api/qa/questions/?user_id=3").then(response => {
        console.log(response)
        if (response.success) {
          this.setState({
            questions: response.questions
          })
        }
      })
    } catch (e) { console.error("Error:", e) }
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey:eventKey
    })
  }

  render() {
    let questions = this.state.questions.map((question) => {
      return (
        <div key={question.id}>
          {console.log(question)}
          <Question question={question} />
        </div>
      )
    })
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={k => this.handleSelect(k)}>
          <NavItem eventKey="1">
            All
        </NavItem>
          <NavItem eventKey="2" >
            Software
        </NavItem>
          <NavItem eventKey="3">
            Mechanical
        </NavItem>
        <NavItem eventKey="4">
            Computer
        </NavItem>
        <NavItem eventKey="5">
            Electrical
        </NavItem>
        <NavItem eventKey="6">
            Civil
        </NavItem>
        </Nav>
        {questions}
      </div>
    )
  }
}

export default Questions;