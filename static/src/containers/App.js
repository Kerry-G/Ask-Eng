
import React, { Component } from 'react';
import Home from '../components/Home';
import Col from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      getDataAns: "no response so far",
      sendDataAns: "no response so far"
    })
  }

  /* 
   * This method is part of the lifecycle of a component in React.
   * If you want to know more about it, read the React Docs
   */
  componentDidMount() {
    this.getData()
    this.sendData()
  }

  /* 
  * getData() is a blueprint for fetching data from the db. 
  * @author: Kerry Gougeon
  */
  async getData() {
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let myInit = {
        method: 'GET',
        headers: myHeaders
      };

      let req = new Request("/api/", myInit)
      let response = await fetch(req)

      let responseJson = await response.json()
      responseJson = JSON.stringify(responseJson)
      this.setState({getDataAns: responseJson})
    } catch (e) { console.error("Error: ", e) }
  }

  /* 
  * sendData() is a blueprint for sending data from the db. 
  * @author: Kerry Gougeon
  */
  async sendData() {
    try {
      let data = { 
        fname: "kerry",
        lname: "gougeon", 
        email: "kerrygougeon@gmail.com", 
        password: "youshouldnotreadthis", 
        engineer: "software", 
        display_image: "/public/images/avatar/73.png" 
      }

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      let myInit = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: myHeaders
      };

      let req = new Request("/api/users/", myInit)
      fetch(req).then(res => res.json())
      .catch(e => console.error('Error:', e))
      .then(response => {
        console.log(response)
        this.setState({sendDataAns:response.message})
      })
    } catch (e) { console.error("Error:", e) }
  }

  render() {
    return (
      <div>
        <Home />
        <p> getData: {this.state.getDataAns} </p>
        <p> sendData: {this.state.sendDataAns} </p>
      </div>
    )
  }

}
export default App;
