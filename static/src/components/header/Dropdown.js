import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem, Image } from 'react-bootstrap'
import { logOut } from '..//..//store//auth'

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
    
    let avatarPath;

    if (this.props.user.display_image !== ""){
      avatarPath = "\\images\\avatar\\" + this.props.user.display_image;
    } else {
      avatarPath = "\\images\\avatar\\4.png";
    }
    // replaced <FontAwesome name='fas fa-cog fa-2x' /> with avatar for mobile friendliness (see Headermenu.js)
    return (
    
     <ButtonToolbar>
          <DropdownButton
            bsStyle="default"
            title = {<Image src={avatarPath} onClick={this.handleShowAvatar} width={40} circle />}
            pullRight
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1" href={profile_path} >My profile</MenuItem>    
			      <MenuItem eventKey="2" href={edit_path}>Edit profile</MenuItem>
			      <MenuItem divider />
            <MenuItem eventKey="4" onClick={logOut}>Logout</MenuItem>
          </DropdownButton>

    </ButtonToolbar > 
    
    )
  }
}

export default Dropdown;










