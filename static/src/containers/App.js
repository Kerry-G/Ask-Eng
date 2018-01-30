import React, { Component } from 'react';
import Home from '../components/Home'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      ans: null
    })
  }
  componentDidMount() {
    this.getData()
    this.sendData()
  }

  async getData() {
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let myInit = {
        method: 'POST',
        headers: myHeaders
      };

      let req = new Request("/api/", myInit)

      let response = await fetch(req)
      let responseJson = await response.json()
      responseJson = JSON.stringify(responseJson)
      this.setState({
        ans: responseJson
      })
    } catch (e) { console.log(e) }
  }

  async sendData() {
    try {
      let data = { username: "kgougeon", email: "kerrygougeon@gmail.com", password: "youshouldnotreadthis", engineer: "software", display_image: "/public/images/avatar/73.png" }
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let myInit = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: myHeaders
      };
      let req = new Request("/api/users/", myInit)
      fetch(req).then(res => console.log(res))
    } catch (e) { console.log(e) }
  }

  render() {
    return (
      <div>
        <Home />
        {this.state.ans}
      </div>
    )
  }

}
export default App;
