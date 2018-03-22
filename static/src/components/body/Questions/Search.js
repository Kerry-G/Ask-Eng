import React, { Component } from 'react'
import { Form, FormControl, Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome' 

class Search extends Component{
    render() {
        return  (
            <Form >
                <FormControl className ="search"  bsSize="sm" type="text" onChange={(e)=>{this.props.handleSearch({value:e.target.value})}} placeholder="enter your search" />
            </Form> 
    )
    }
}

export default Search; 