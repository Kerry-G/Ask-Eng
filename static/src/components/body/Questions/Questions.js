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
      activeKey:"0",
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    try {
      let engineerArray = ["","&engineer=Software","&engineer=Mechanical","&engineer=Computer","&engineer=Electrical","&engineer=Civil"]
      console.log(engineerArray[(this.state.activeKey)])
      fetchAPI("GET", "/api/qa/questions/?" + engineerArray[(this.state.activeKey)]).then(response => {
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
    },()=>{this.getQuestions()} )
    
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
          <NavItem eventKey="0">
            All
        </NavItem>
          <NavItem eventKey="1" >
            Software
        </NavItem>
          <NavItem eventKey="2">
            Mechanical
        </NavItem>
        <NavItem eventKey="3">
            Computer
        </NavItem>
        <NavItem eventKey="4">
            Electrical
        </NavItem>
        <NavItem eventKey="5">
            Civil
        </NavItem>
        </Nav>
        {questions}
      </div>
    )
  }
}

export default Questions;