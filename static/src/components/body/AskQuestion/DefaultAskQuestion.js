import React from 'react'
import { Jumbotron, Button, Row, Col, Grid } from 'react-bootstrap'

const DefaultAskQuestion = (props) => (
    <Grid>
      <Col xs={12} lg={8}>
          <Jumbotron>
            <h2>Hello you!</h2>
            <p>You want to ask a question too? Don't be shy, register!</p>
            <p>
              <Button bsStyle="primary" onClick={props.register}>Register</Button>
            </p>
          </Jumbotron>
        </Col>
    </Grid>
)

export default DefaultAskQuestion;

