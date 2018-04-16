import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import Register from './Register'
import Login from './LoginBox/Login'
import AskQuestion from './AskQuestion/AskQuestion'
import DefaultAskQuestion from './AskQuestion/DefaultAskQuestion'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Profile from './Profile/Profile'
import Questions from './Questions/Questions';
import QuestionPage from './Questions/QuestionPage/QuestionPage';
import Edit from './Profile/Edit';

class Body extends Component {

  constructor(props) {
    super(props);
    this.handleShowRegister = this.handleShowRegister.bind(this);
    this.handleCloseRegister = this.handleCloseRegister.bind(this);
	this.handleQuestions = this.handleQuestions.bind(this);
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

  handleQuestions(){
	  this.questions.getQuestions();
  }

  render() {
    let login, askQuestion;
    if ((Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if no user is login 
      login = <Col lg={4}>  <div className="box-login"> <Login registerModal={this.handleShowRegister} /> </div></Col>
      askQuestion = <Col lg={8}><DefaultAskQuestion register={this.handleShowRegister} /> </Col>
    } else {
      askQuestion = <div className="ask-question-box"> <AskQuestion updateQuestions={this.handleQuestions} /> </div> 
    }

    return (
      <div id="body">
        <Grid fluid>
          <Row>
              {/* body part */}
                <Route exact path='/' render={()=>{
                  return(
                    <div>
                    {askQuestion}
                    {login}
                    {<Questions user={this.props.user} ref={questions => this.questions =questions}/>}
                  </div>
                  )
                }} />
                <Route exact path='/question/:id' component={QuestionPage} />
                <Route exact path='/users/' component={Profile} />
                <Route path='/users/:id' component={Profile} />
				<Route path='/edit' component={Edit}/>
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
