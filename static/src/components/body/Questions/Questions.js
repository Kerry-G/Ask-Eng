import React, { Component } from 'react'
import { connect } from 'react-redux'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    return (
      <div> question box </div>
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
