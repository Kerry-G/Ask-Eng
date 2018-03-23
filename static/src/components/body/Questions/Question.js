import React, { Component } from 'react'
import { Col, Row, Grid } from 'react-bootstrap'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Votes from "../../votes/Votes";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        };
    }

    render() {
        let time = moment(this.props.question.register_date).subtract(5, "hours").fromNow()
        let path = "/question/" + this.props.question.id;
        return (
            <div key={this.props.question.id} className="question-box">
                <Grid>
                    <Row>
                        <Col lg={12}>
                            <Votes
                                question = {this.props.question}
                                status = {this.props.question.vote_status}
                                user={this.props.user}
                                comment_status = {'question'}
                            />
                            <Row>
                                <h1><span className="question-tag">{this.props.question.engineer}</span>
                                <Link to={path} style={{textDecoration: 'none'}}>{this.props.question.title}</Link></h1>
                                <div className="question-time">{time} by {this.props.question.user.fname} {this.props.question.user.lname}</div>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default Question;
