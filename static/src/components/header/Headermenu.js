import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import Dropdown from '../header/Dropdown'

class Headermenu extends Component {

  render() {
    let comp;
  
    let avatarPath;

    if (this.props.user.display_image !== ""){
      avatarPath = "\\images\\avatar\\" + this.props.user.display_image;
    } else {
      avatarPath = "\\images\\avatar\\4.png";
    }

    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if the user is connected
      comp = <div>
        <Dropdown
          user={this.props.user}
        />
         <Image src={avatarPath} onClick={this.handleShowAvatar} width={64} circle />
      </div>;
    }

    return (
      <div>{comp}</div>
    )
  }
}

export default Headermenu;