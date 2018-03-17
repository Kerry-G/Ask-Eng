import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const DefaultAskQuestion = (props) => (
          <Jumbotron>
            <h2>Hello you!</h2>
            <p>Want to ask a question too? Don't be shy, register now!</p>
            <p>
              <button className="reg-btn-color" onClick={props.register}>Register</button>
            </p>
          </Jumbotron>
)

export default DefaultAskQuestion;