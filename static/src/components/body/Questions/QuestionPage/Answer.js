import React, { Component } from 'react'
import {fetchAPI} from '../../../utility'
import { Col, Row, Well, Image } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import Votes from "../../../votes/Votes";

class Answer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let avatarPath = `\\images\\avatar\\4.png`;
      return (
        <div key={this.props.answer.id} className="question-box">
        <Row>
          <Col lg={3} xs={4}>
            <Votes
                        question = {this.props.answer}
                        status = {this.props.answer.vote_status}
                        user={this.props.user}
            />
            <Image src={avatarPath} width={64} circle />
          </Col>

          <Col md={9} xs={8}>
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
