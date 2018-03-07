import React, { Component } from 'react'
import { Image, Modal, Button } from 'react-bootstrap'
import { fetchAPI } from '../../utility'
import { updateUser } from '../../../store/auth'

class ChooseAvatar extends Component {

  constructor(props){
    super(props);
    this.state = {
      rand: this.getRandomNumber(),
      user_id: this.props.user.id,
      buttonMsg: 'Pick one!',
    };

    this.refreshImage = this.refreshImage.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  refreshImage() {
    this.setState({
      rand: this.getRandomNumber(),
      buttonMsg: 'Save it!'
    });
  }

  async updateAvatar() {
    try {
      let data = {
        user_id: this.props.user.id,
        display_image: this.state.rand+'.png'
    }
      fetchAPI("PUT", "/api/users/displayImage/", data).then(response => {
        if (response.success) {
          this.setState({ buttonMsg: 'Awesome!!!'});
          let updatedUser = JSON.parse(JSON.stringify(this.props.user))
          updatedUser.display_image = data.display_image
          updateUser(updatedUser)
          this.updateProfileCard()
        }
      }).catch((e) => console.error("Error:", e))
    }
    catch (e) {
      console.error("Error:", e)
    }
  }

  closeModal(){
    this.props.handleClose()
    this.setState({
      rand: this.getRandomNumber(),
      buttonMsg: "Pick one!"
    })
  }

  getRandomNumber(){
    return Math.floor(Math.random() * 83) + 1
  }

  render() {
    let avatarPath = "\\images/avatar/" + this.state.rand + ".png";
    return (
      <Modal className="avatarChange" show={this.props.show} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
        <Modal.Title>Change your avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click on the icon to select!</Modal.Body>
        <Image src={avatarPath} onClick={this.refreshImage} width={64} circle />
        <Modal.Footer> 
          <Button onClick={this.updateAvatar}>{this.state.buttonMsg}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChooseAvatar;