import React, { Component } from 'react'
import { Form, FormControl} from 'react-bootstrap'

class Search extends Component{
    render() {
        return  (
            <Form >
                <FormControl className ="search"  bsSize="sm" type="text" onChange={(e)=>{this.props.handleSearch({value:e.target.value.toUpperCase()})}} placeholder="enter your search" />
            </Form> 
    )
    }
}

export default Search; 