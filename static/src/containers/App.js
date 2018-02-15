
import React, { Component } from 'react';
import Body from '../components/body/Body';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Debug from '../components/Debug/Debug.js';

class App extends Component {



  render() {
    
    return (
      <div >
        <Router>
          <div id="app">
          <Header />
          <Route path='/' component={Body}/>
          <Route path='/debug' component={Debug} />
          </div>
        </Router>
        {/* <Footer/> */}
      </div>
    )
  }

}
export default App;
