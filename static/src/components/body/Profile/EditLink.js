import React, { Component } from 'react'
class EditLink extends Component {
    render(){
        return(
            <a id={this.props.id} onClick={this.props.onClick}>
                <div>{this.props.title}</div>
            </a>
        )
    }
    
}

export default EditLink