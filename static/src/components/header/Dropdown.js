import React, { Component } from 'react'
import { Col, Row, Image, ButtonToolbar, DropdownButton,MenuItem } from 'react-bootstrap'
import { logOut } from '..//..//store//auth'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome' 

class Dropdown extends Component {


  render() {

    return (
      
     <ButtonToolbar >
          <DropdownButton
            bsStyle="default"
            title = {<FontAwesome name='fas fa-cog' />}
            noCaret
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1">My profile  </MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">settings</MenuItem>
            
            <MenuItem divider />
            <MenuItem eventKey="4" onClick={logOut}> Logout  </MenuItem>
          </DropdownButton>
    </ButtonToolbar > 
    
    )
  }
}

export default Dropdown;










