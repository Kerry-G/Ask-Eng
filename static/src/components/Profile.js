import React, {Component} from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfileArea from './body/Profile/ProfileArea';
import ProfileBody from './body/Profile/ProfileBody';
import {Col, Row, Grid} from 'react-bootstrap'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
	}

  render() {
  console.log(this.props);
    return (
        <div>
            <Header/>
			<ProfileBody/>
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
