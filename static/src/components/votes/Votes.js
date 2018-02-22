import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {fetchAPI} from "../utility";
import {Grid} from 'react-bootstrap';

class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote : this.props.question.ups - this.props.question.downs,
            color: "black",
            status: 0, //0 means no vote, 1 means upvoted, -1 means downvoted
        };
        this.vote = this.vote.bind(this)
    }

    async vote(version) {
        try {
            let currentVote = this.state.vote;
            if (this.state.status === 0) {
                if (version === "ups") {
                    this.setState({
                        vote: ++this.state.vote,
                        color: "red",
                        status: 1
                    })
                }
                if (version === "downs") {
                    this.setState({
                        vote: --this.state.vote,
                        color: "blue",
                        status: -1
                    })
                }
            } else if (this.state.status === 1){
                if (version === "ups") {
                    this.setState({
                        vote: --this.state.vote,
                        color: "black",
                        status: 0
                    })
                }
                if (version === "downs") {
                    this.setState({
                        vote: this.state.vote-2,
                        color: "blue",
                        status: -1
                    })
                }
            } else if (this.state.status === -1) {
                if (version === "ups") {
                    this.setState({
                        vote: this.state.vote+2,
                        color: "red",
                        status: 1
                    })
                }
                if (version === "downs") {
                    this.setState({
                        vote: ++this.state.vote,
                        color: "black",
                        status: 0
                    })
                }
            }
            let body = {actions:version};
            fetchAPI("PUT", "/api/qa/questions/" + this.props.question.id, body).then(response => {
                if (response.success) {
                }
            })
        } catch (e) { console.error("Error", e) }
    }



    render() {
        let boxStyle={width:"50px", height:"50px", margin:"10px",float:"left"};
        let arrowsSet={color:this.state.color, textAlign:"center", fontSize:"14px"};
        let cursor = {cursor:"pointer"};
        return (
            <div style={boxStyle}>
                <Grid fluid>
                <div style={arrowsSet}>
                    <span style={cursor} onClick={() => { this.vote("ups") }}>
                        <FontAwesome name='chevron-up' />
                    </span>
                    <div>{this.state.vote}</div>
                    <span style={cursor}  onClick={() => { this.vote("downs") }}>
                        <FontAwesome name='chevron-down' />
                    </span>
                </div>
                </Grid>
            </div>
        )
        ;
    }
}

export default Votes;