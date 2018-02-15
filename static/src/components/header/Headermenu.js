import React, { Component } from 'react'
import { Col, Row, Image} from 'react-bootstrap'
import { connect } from 'react-redux'
import Dropdown from '../header/Dropdown'
import ChooseAvatar from '../body/LoginBox/ChooseAvatar'
import fontawesome from 'react-fontawesome' 

class Headermenu extends Component {


  render() {

    let menu = <Dropdown/>
    let points = {
      float: "right"
    }
    let avatarPath;
    if (this.props.user.display_image !== ""){
      avatarPath = "images\\avatar\\" + this.props.user.display_image;
    } else {
      avatarPath = "images\\avatar\\4.png";
    }


    return (
      <div>
        {menu}
         <Image src={avatarPath} onClick={this.handleShowAvatar} width={64} circle />
      </div>
    )
  }
}

export default Headermenu;