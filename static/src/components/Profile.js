import React, {Component} from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfileArea from './body/Profile/ProfileArea';
import {Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
        <div>
            <Header/>
			<ProfileArea/>
            <Footer/>
        </div>
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
