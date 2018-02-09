import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class Questions extends Component {
  render() {
    return (
      <Jumbotron>
        <h2>Hello you!</h2>
        <p>
          You want to ask a question too? Don't be shy, register!
        </p>
        <p>
          <Button bsStyle="primary" onClick={this.props.register}>register</Button>
        </p>
      </Jumbotron>
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

