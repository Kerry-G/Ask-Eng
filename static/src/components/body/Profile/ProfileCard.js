import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import moment from 'moment';

class ProfileCard extends Component {

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
    };
    let avatarPath;
    let registerDate = moment(this.props.user.register_date);

    if (this.props.user.display_image !== "") {
      avatarPath = `\\images\\avatar\\${this.props.user.display_image}`;
    } else {
      avatarPath = "\\images\\avatar\\4.png";
    }


    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Media>
            <Media.Left>
              <Image src={avatarPath} onClick={this.handleShowAvatar} width={64} circle />
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
          <div style={points}><FontAwesome name='chevron-up' />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.ups}</div>
          <br/>
          <Glyphicon glyph="calendar" />&nbsp;&nbsp;&nbsp;&nbsp;Member since: {registerDate.format("LL")}
          <div style={points}><FontAwesome name='chevron-down' />&nbsp;&nbsp;&nbsp;&nbsp;{this.props.user.downs}</div>
        </Panel.Body>
      </Panel>
    );
  }
}


export default ProfileCard;