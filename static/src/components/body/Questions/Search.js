import React, { Component } from 'react'
import { Form, FormControl, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome' 

class Search extends Component{






    render() {


        return  (
            <Form >
            <FormControl className ="search"  bsSize="sm" type="text" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="enter your search" />
            <button className="reg-btn-color" id="searchButton"  onClick={(e)=>this.handleSearch(e)}>{<FontAwesome name='fas fa-search' />}</button>
            </Form> 
          
    )


    }
}

export default Search; 