import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'

class Profile extends Component{
  render(){
    return(
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.props.user.fname} {this.props.user.lname}'s Profile</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <small>{this.props.user.engineer} engineering</small>
          <p>
            <br />
            <i class="glyphicon glyphicon-envelope"></i>&nbsp;{this.props.user.email}
            <br />
          </p>
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