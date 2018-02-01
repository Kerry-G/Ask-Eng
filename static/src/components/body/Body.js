import React, {Component} from 'react'
import { Media } from 'react-bootstrap'
class Body extends Component {


	constructor(props) {
	    super(props);
	    this.state = ({
	      response: undefined,
	    })
	}



	componentDidMount() {
    this.getUsers()
  }

  
  async getUsers() {
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let myInit = {
        method: 'GET',
        headers: myHeaders
      };

      let req = new Request("/api/users/", myInit)
      let response = await fetch(req)
      let responseJson = await response.json()
      console.log(responseJson)
      this.setState({response: responseJson})
    } catch (e) { console.error("Error: ", e) }
  }



 
/*




*/


  render() {
   

  let users = [];
  if (this.state.response !== undefined) {
    users = this.state.response.users.map((user)=>{ 
      let display_image = "/images/avatar/" + user.display_image;
      return (
      <Media>
        <Media.Left>
          <img width={64} height={64} src={display_image} alt="thumbnail" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{user.fname} {user.lname}</Media.Heading>
          <p>
            {user.email} 
            {user.engineer}
          </p>
        </Media.Body>
      </Media>
    )})

    // users.map( (user) => {
    //                   console.log(user)
    // })
  }


   return (
             <div>
               HELLO:  {users}
            </div>
        )
  }


}

export default Body;
