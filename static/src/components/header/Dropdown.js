import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton,MenuItem } from 'react-bootstrap'
import { logOut } from '..//..//store//auth'
import FontAwesome from 'react-fontawesome' 
import ChooseAvatar from '..//body//LoginBox//ChooseAvatar'

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAvatar: false,
    };
    this.handleShowAvatar = this.handleShowAvatar.bind(this);
    this.handleCloseAvatar = this.handleCloseAvatar.bind(this);
  }

  handleCloseAvatar() {
    this.setState({ showAvatar: false });
  }

  handleShowAvatar() {
    this.setState({ showAvatar: true });
  }

  render() {
    let profile_path = '/users/' + this.props.user.id
	let edit_path = '/edit'
    return (
    
     <ButtonToolbar >
          <DropdownButton
            bsStyle="default"
            title = {<FontAwesome name='fas fa-cog fa-2x' />}
            noCaret
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1" href={profile_path} >My profile</MenuItem>    
			<MenuItem eventKey="2" href={edit_path}>Edit profile </MenuItem>
			<MenuItem divider />
            <MenuItem eventKey="4" onClick={logOut}> Logout  </MenuItem>
          </DropdownButton>

    </ButtonToolbar > 
    
    )
  }
}

export default Dropdown;










