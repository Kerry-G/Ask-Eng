import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from './Register'
import Login from './LoginBox/Login'
import ProfileCard from './LoginBox/ProfileCard'
import AskQuestion from './AskQuestion/AskQuestion'
import DefaultAskQuestion from './AskQuestion/DefaultAskQuestion'
import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import Profile from './Profile/Profile'
import Questions from './Questions/Questions';
import QuestionPage from './Questions/QuestionPage/QuestionPage';

class Body extends Component {

  constructor(props) {
    super(props);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
    this.state = {
      showRegister: false,
    };
  }

  handleCloseRegister() {
    this.setState({ showRegister: false });
  }

  handleShowRegister() {
    this.setState({ showRegister: true });
  }

  render() {
    let login, askQuestion, profileCard;
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if no user is login 
      login = <Col lg={4}>  <div className="box-login"> <Login registerModal={this.handleShowRegister} /> </div></Col>
      askQuestion = <Col lg={8}><DefaultAskQuestion register={this.handleShowRegister} /> </Col>
    } else {
      askQuestion = <div className="ask-question-box"> <AskQuestion /> </div> 
      profileCard = <div className="profile-card"><ProfileCard /> </div>
    }

    return (
      <div>
        <Grid>
          <Row>
              {/* body part */}
                <Route exact path='/' render={()=>{
                  return(
                    <div>
                    {askQuestion}
                    {login}
                    {<Questions/>}
                    {/* {profileCard} */}
                  </div>
                  )
                }} />
                <Route exact path='/question/' component={QuestionPage} />
                <Route exact path='/users/' component={Profile} />
                <Route path='/users/:id' component={Profile} />
          </Row>
          <Register
            show={this.state.showRegister}
            handleClose={this.handleCloseRegister} />
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

Body = connect(
  mapStateToProps,
)(Body);

export default Body;
