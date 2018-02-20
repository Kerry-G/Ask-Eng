import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import ChooseAvatar from './ChooseAvatar.js';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAvatar: false,
    };
    this.handleShowAvatar = this.handleShowAvatar.bind(this);
    this.handleCloseAvatar = this.handleCloseAvatar.bind(this);
  }

  handleCloseAvatar() {
    this.setState({ showAvatar: false });
  }

  handleShowAvatar() {
    this.setState({ showAvatar: true });
  }

  render() {
    let points = {
      float: "right"
    }
    let avatarPath;
    if (this.props.user.display_image !== ""){
      avatarPath = "\\images\\avatar\\" + this.props.user.display_image;
    } else {
      avatarPath = "\\images\\avatar\\4.png";
    }
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Media>
            <Media.Left>
              <Image src={avatarPath} onClick={this.handleShowAvatar} width={64} circle />
              <ChooseAvatar 
              show={this.state.showAvatar}
              user = {this.props.user}
              handleOpen={this.handleOpen}
              handleClose={this.handleCloseAvatar}/>
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
          <div style={points}><FontAwesome name='chevron-up' />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.ups}</div>
          <br />
          <Glyphicon glyph="comment" />&nbsp;&nbsp;&nbsp;&nbsp;my answers
          <div style={points}><FontAwesome name='chevron-down' />&nbsp;&nbsp;&nbsp;&nbsp;{this.state.ups}</div>
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