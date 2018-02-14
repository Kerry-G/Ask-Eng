import React, { Component } from 'react'
import { Panel, Glyphicon, ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import { connect } from 'react-redux'

class Profile extends Component{
  render(){
    let points = {
      float: "right"
    }
    return(
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.user.fname}&nbsp;{this.props.user.lname}'s Profile</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
              <Glyphicon glyph="user" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.engineer} engineering
              <br />
              <Glyphicon glyph="envelope" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.email}
              <br />
              <Glyphicon glyph="cog" />&nbsp;&nbsp;&nbsp;&nbsp;my settings
              <br />
              <Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my questions
              <div style={points}><Glyphicon glyph="thumbs-up" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.ups}</div>
              <br />
              <Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my answers
              <div style={points}><Glyphicon glyph="thumbs-down" />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.downs}</div>
          </Panel.Body>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Profile = connect(
  mapStateToProps,
)(Profile);

export default Profile;