import React, { Component } from 'react'
import {fetchAPI} from '../../../utility'
import { Col, Row, Well } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'

class Answer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div key={this.props.answer.id} className="question-box">
        <Row>
          <Col lg={2} xs={4}>
            <div className="square">
              <div className="fontawesomearrow down">
                <FontAwesome name='chevron-up' />
              </div>
              <div className="points down">
                {this.props.answer.ups}
              </div>
            </div>
            <div className="square">
              <div className="fontawesomearrow up">
                <FontAwesome name='chevron-down' />
              </div>
              <div className="points up">
                {this.props.answer.downs}
              </div>
            </div>
          </Col>

          <Col md={10} xs={8} right>
            <h1>{this.props.answer.title}</h1>
            <Well bsSize="small">
              <p>{this.props.answer.text}</p>
            </Well>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Answer;
