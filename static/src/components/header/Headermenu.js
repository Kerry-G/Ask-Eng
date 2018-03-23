import React, { Component } from 'react'
import Dropdown from '../header/Dropdown'

class Headermenu extends Component {

  render() {
    let comp;
    if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) { //if the user is connected
      comp = <div>
        <Dropdown
          user={this.props.user}
        />
      </div>;
      //removed <Image src={avatarPath} onClick={this.handleShowAvatar} width={40} circle /> for mobile friendliness (see Dropdown.js)
    }

    return (
      <div>{comp}</div>
    )
  }
}

export default Headermenu;