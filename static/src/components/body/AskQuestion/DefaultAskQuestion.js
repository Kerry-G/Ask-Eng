import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const DefaultAskQuestion = (props) => (
          <Jumbotron>
            <h2>Hello you!</h2>
            <p>You want to ask a question too? Don't be shy, register!</p>
            <p>
              <Button bsStyle="primary" onClick={props.register}>Register</Button>
            </p>
          </Jumbotron>
)

export default DefaultAskQuestion;

