import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      let time = moment(this.props.question.register_date).subtract(5,"hours").fromNow()
      return (
        <div key={this.props.question.id} className="question-box">
        <Row>
            <Col lg={12}>
              <div className="square">
                <div className="fontawesomearrow down">
                  <FontAwesome name='chevron-up' />
                </div>
                <div className="points down">
                  {this.props.question.ups}
                </div>
              </div>
              <div className="square">
                <div className="fontawesomearrow up">
                  <FontAwesome name='chevron-down' />
                </div>
                <div className="points up">
                  {this.props.question.downs}
                </div>
              </div>
            <Row>
              <h1><span className="question-tag">{this.props.question.engineer}</span>{this.props.question.title}</h1>
              <div className="question-time">{time} by {this.props.question.user.fname} {this.props.question.user.lname}</div>
              </Row>
            </Col>

          </Row>
        </div>
      )
    }
}


export default Question;
