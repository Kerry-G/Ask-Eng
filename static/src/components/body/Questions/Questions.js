import React, { Component } from 'react'
import {fetchAPI} from '../../utility'
import { connect } from 'react-redux'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions:[]
    };
  }

  async getQuestions(){
    console.log('fetching...')
    try{
      fetchAPI("GET", "/api/qa/questions/?user_id=2").then(response =>{
        console.log('fetch!')
        console.log(response)
        if(response.success){
          console.log(response.questions)
        }
      })
    } catch(e){console.error("Error:", e)}
  }

  render() {
    this.getQuestions();
    let questions = this.state.questions.map((data)=>{console.log(data)})
    return (
      <div>
        {questions}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Questions = connect(
  mapStateToProps,
)(Questions);

export default Questions;
