import React, { Component } from 'react'
class EditLink extends Component {
    render(){
        return(
            <a className="profile-badges" onClick={this.props.onClick}>
                <div>{this.props.title}</div>
            </a>
        )
    }
    
}

export default EditLink