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
  }

  async getData() {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var myInit = {
        method: 'POST',
        headers: myHeaders
      };

      let req = new Request("http://127.0.0.1:5000/api/", myInit)

      let response = await fetch(req)
      let responseJson = await response.json()
      responseJson = JSON.stringify(responseJson)
      this.setState({
        ans:responseJson
      })

    } catch (e) { console.log(e) }
  }

  render() {
    return (
      <div>
        <Home/>
        {this.state.ans}
      </div>
    )
  }

}
export default App;
