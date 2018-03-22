import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {fetchAPI} from "../utility";
import {Grid} from 'react-bootstrap';

class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote : parseInt(this.props.question.ups - this.props.question.downs,10),
            color: "black",
            status: 0, //0 means no vote, 1 means upvoted, -1 means downvoted
        };
        this.vote = this.vote.bind(this);
        this.voteDown = this.voteDown.bind(this);
        this.voteUp = this.voteUp.bind(this);

    }

    componentDidUpdate(previousProps, previousState){
        if (this.state.status !== previousState.status) {
            this.handleStatusChange();
        }
    }

    componentDidMount(){
        this.setState({status: parseInt(this.props.status,10)})
    }

    async vote(version) {
        try {
            let currentVote = this.state.vote;
            let status = 0;
            if (this.state.status === 0) {
                if (version === "ups") {
                    this.setState({
                        vote: ++currentVote,
                        status: 1
                    });
                    status = 1
                }
                if (version === "downs") {
                    this.setState({
                        vote: --currentVote,
                        status: -1
                    });
                    status = -1
                }

            } else if (this.state.status === 1){
                if (version === "ups") {
                    this.setState({
                        vote: --currentVote,
                        status: 0
                    });
                    status = 0
                }
                if (version === "downs") {
                    this.setState({
                        vote: currentVote-2,
                        status: -1
                    });
                    status = -1
                }
            } else if (this.state.status === -1) {
                if (version === "ups") {
                    this.setState({
                        vote: currentVote+2,
                        status: 1
                    });
                    status = 1
                }
                if (version === "downs") {
                    this.setState({
                        vote: ++currentVote,
                        status: 0
                    });
                    status = 0
                }

            }


            let loggedin_id = this.props.user===undefined ? -1 : this.props.user.id;
            console.log(status)
            let body = {
                vote_status: status,
                loggedin_id: loggedin_id,
                comment_status: this.props.comment_status
            };
            console.log(body);
            fetchAPI("PUT", "/api/qa/questions/" + this.props.question.id, body).then(response => {
                console.log(response)
            })
        } catch (e) { console.error("Error", e) }
    }



    voteUp(){
        this.vote("ups");
    }

    voteDown(){
        this.vote("downs");
    }

    handleStatusChange(){
        if (this.state.status === 0) {
            this.setState({
                color:"black"
            })
        } else if (this.state.status === 1){
            this.setState({
                color:"red"
            })
        } else if (this.state.status === -1){
            this.setState({
                color:"blue"
            })
        }
    }

    render() {
        let boxStyle={width:"50px", height:"50px", margin:"10px",float:"left"};
        let arrowsSet={color:this.state.color, textAlign:"center", fontSize:"14px"};
        let cursor = {cursor:"pointer"};
        return (
            <div style={boxStyle}>
                <Grid fluid>
                <div style={arrowsSet}>
                    <span style={cursor} onClick={this.voteUp}>
                        <FontAwesome name='chevron-up' />
                    </span>
                    <div>{this.state.vote}</div>
                    <span style={cursor}  onClick={this.voteDown}>
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