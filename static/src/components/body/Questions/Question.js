import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import { fetchAPI } from '../../utility'
import {Link} from 'react-router-dom'
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ups: this.props.question.ups,
            downs: this.props.question.downs
        }
        this.vote = this.vote.bind(this)
    }

    async vote(version) {
        try {
            let body = {actions:version}
            fetchAPI("PUT", "/api/qa/questions/" + this.props.question.id, body).then(response => {
                if (response.success) {
                    if (version=="ups"){
                    let up = this.state.ups
                    up++;
                    this.setState({
                        ups: up
                    })
                }
                if (version=="downs"){
                    let down = this.state.downs
                    down++;
                    this.setState({
                        downs:down
                    })
                }
                
                }
            })
        } catch (e) { console.error("Error", e) }
    }

    render() {
        let time = moment(this.props.question.register_date).subtract(5, "hours").fromNow()
        let path = "/question/" + this.props.question.id
        return (
            <div key={this.props.question.id} className="question-box">
                <Row>
                    <Col lg={12}>
                        <div onClick={() => { this.vote("ups") }} className="square">
                            <div className="fontawesomearrow down">
                                <FontAwesome name='chevron-up' />
                            </div>
                            <div className="points down">
                                {this.state.ups}
                            </div>
                        </div>
                        <div onClick={() => { this.vote("downs") }} className="square">
                            <div className="fontawesomearrow up">
                                <FontAwesome name='chevron-down' />
                            </div>
                            <div className="points up">
                                {this.state.downs}
                            </div>
                        </div>
                        <Row>
                            <h1><span className="question-tag">{this.props.question.engineer}</span>
                            <Link to={path} style={{textDecoration: 'none'}}>{this.props.question.title}</Link></h1>
                            <div className="question-time">{time} by {this.props.question.user.fname} {this.props.question.user.lname}</div>
                        </Row>
                    </Col>

                </Row>
            </div>
        )
    }
}


export default Question;
