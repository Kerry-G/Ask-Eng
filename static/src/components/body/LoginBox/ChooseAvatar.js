import React, { Component } from 'react'
import { Panel, Glyphicon, Image, Media, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchAPI } from '../../utility'

class ChooseAvatar extends Component {


  constructor(props){
    super(props);
    this.state = {
      rand: Math.floor(Math.random() * 83) + 1,
      user_id: props.props.user.id,
      buttonMsg: 'Pick one!',
      show: props.show
    };

    this.refreshImage = this.refreshImage.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.refreshImage();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  refreshImage() {
    this.setState({
      rand: Math.floor(Math.random() * 83) + 1,
      buttonMsg: 'Save it!'
    });
  }

  async updateAvatar() {
        this.setState({
          buttonMsg: 'Awesome!!!'
        });
        try {
            let data = {
              user_id: this.state.user_id,
              display_image: this.state.rand+'.png'
            }
            console.log(data)
            fetchAPI("PUT", "/api/users/displayImage/", data).then(response => {
                if (response.success) {
                    console.log(response)
                    this.setState({ answer: response.message })
                }
            }).catch((e) => console.error("Error:", e))
        }
        catch (e) {
            console.error("Error:", e)
        }
        this.handleClose()
  }

  render() {
 
    let avatarPath = "images/avatar/" + this.state.rand + ".png";
    let css = {
      verticalAlign: 'baseline'
    }
    return (
           <Modal className="avatarChange" show={this.state.show} onHide={this.handleClose}>
           <Modal.Header closeButton>
            <Modal.Title>Change your Avatar</Modal.Title>
           </Modal.Header>
              <Image src={avatarPath} onClick={this.refreshImage} width={64} circle />
            
              <Button onClick={this.updateAvatar}>{this.state.buttonMsg}</Button>
          </Modal>
    );

  }

}


export default ChooseAvatar;