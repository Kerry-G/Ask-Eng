import React, { Component } from 'react'
import {fetchAPI} from '../../utility'
import { connect } from 'react-redux'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions=[]
    };
  }

  async getQuestions(){
    try{
      fetchAPI("PUT", "/api/questions/").then(response =>{
        
      })
    } catch(e){console.error("Error:", e)}
  }

  render() {
    return (
      <div>
        question.map((data)=>{data})
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
