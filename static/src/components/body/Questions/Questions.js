import React, { Component } from 'react'
import { fetchAPI } from '../../utility'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import Question from './Question'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeKey:"0",
      activeQuery:"0",
      extraQuery:""
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    try {
      let engineerArray = ["","&engineer=Software","&engineer=Mechanical","&engineer=Computer","&engineer=Electrical","&engineer=Civil"]
      fetchAPI("GET", "/api/qa/questions/?" + engineerArray[(this.state.activeQuery)] + this.state.extraQuery).then(response => {
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
          <NavItem onClick={()=>{this.setState({activeQuery:"0"})}} eventKey="0">
            All
        </NavItem>
          <NavItem onClick={()=>{this.setState({activeQuery:"1"})}} eventKey="1" >
            Software
        </NavItem>
          <NavItem onClick={()=>{this.setState({activeQuery:"2"})}} eventKey="2">
            Mechanical
        </NavItem>
        <NavItem onClick={()=>{this.setState({activeQuery:"3"})}} eventKey="3">
            Computer
        </NavItem>
        <NavItem onClick={()=>{this.setState({activeQuery:"4"})}} eventKey="4">
            Electrical
        </NavItem>
        <NavItem onClick={()=>{this.setState({activeQuery:"5"})}} eventKey="5">
            Civil
        </NavItem>
        <NavDropdown eventKey="6" title="Sort" id="nav-dropdown">
          <MenuItem onClick={()=>this.setState({extraQuery:"&sort=title"})} eventKey="6.1">Title</MenuItem>
          <MenuItem onClick={()=>this.setState({extraQuery:"&sort=register_date&reverse=1"})}  eventKey="6.2">Newest</MenuItem>
          <MenuItem onClick={()=>this.setState({extraQuery:"&sort=register_date&reverse=0"})}  eventKey="6.3">Oldest</MenuItem>
          <MenuItem eventKey="6.4">Ups</MenuItem>
          <MenuItem eventKey="6.5">Downs</MenuItem>
        </NavDropdown>
        </Nav>
        {questions}
      </div>
    )
  }
}

export default Questions;