import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media } from 'react-bootstrap'
import { connect } from 'react-redux'

class Profile extends Component {
  render() {
    let points = {
      float: "right"
    }
    let avatarPath;
    if (this.props.user.display_image != ""){
      avatarPath = "images\\avatar\\" + this.props.user.display_image
    } else {
      avatarPath = "images\\avatar\\3.png"
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Media>
            <Media.Left>
              <Image src={avatarPath} width={64} circle />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <Panel.Title>{this.props.user.fname}&nbsp;{this.props.user.lname}'s Profile</Panel.Title>
              </Media.Heading>
                {this.props.user.engineer} engineering
            </Media.Body>
          </Media>
        </Panel.Heading>
        <Panel.Body>
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