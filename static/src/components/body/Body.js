import React, {Component} from 'react'
import { Media } from 'react-bootstrap'
class Body extends Component {


	constructor(props) {
	    super(props);
	    this.state = ({
	      getDataAns: [],
	    })
	}

  componentDidMount() {
    this.getUsers()
  }



	componentDidMount() {
    this.getUsers()
  }

  /* 
  * getData() is a blueprint for fetching data from the db. 
  * @author: Jon Mongeau
  */
  async getUsers() {
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let myInit = {
        method: 'GET',
        headers: myHeaders
      };

      let req = new Request("/api/users/", myInit)
      console.log(req)
      let response = await fetch(req)
      let responseJson = await response.json()
      console.log(responseJson)
      this.setState({getDataAns: responseJson})
    } catch (e) { console.error("Error: ", e) }
  }


/*
<div>
                {this.state.getDataAns.users.map(function(user){
                    return <li key={ user }>{user}</li>;
                  })}
            </div>
 */
 


  render() {
  	console.log(this.state.getDataAns)

   return (
             <div>
                Hello
            </div>
        )
  }


}

export default Body;
