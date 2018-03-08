import React, { Component } from 'react'
import { Grid, Row, Modal, ControlLabel, Popover, OverlayTrigger,Button } from 'react-bootstrap'
import Select from 'react-select'

class EditModal extends Component {
    render() {
        let popoverFocus = <Popover 
            title="Your password should be safe!" 
            id="popover-basic">
            Your password must contain atleast one lowercase character,
            one uppercase character, one special character "@#$%",
            and atleast 6 characters.</Popover>

        const Input = this.props.regularInput 
            ? this.props.inputs.map(
                input => { return (
                    <div key={input.title}>
                        <Row>
                            {input.title}
                        </Row>
                        <Row>
                        {!input.overlay
                            ? <textarea 
                            className="input-edit"
                            rows="1"
                            cols="45"
                            placeholder={input.placeholder}
                            onChange={input.onChange} 
                            />
                            : <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
                                <textarea
                                className="input-edit"
                                rows="1"
                                cols="45"
                                placeholder={input.placeholder}
                                onChange={input.onChange} 
                                />
                            </OverlayTrigger>
                        }
                        </Row>
                    </div>);
                })
            : (<div> <ControlLabel>{this.props.label}</ControlLabel>
                <Select
                    name={this.props.selectname}
                    value={this.props.value}
                    options={this.props.options}
                    onChange={this.props.onChange}
                />
            </div>)

        return (
            <Modal dialogClassName="box-edit-modal" show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Body>
                    <Grid fluid>
                        {Input}
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Grid fluid>
                        <Row>
                            <Button className="reg-btn" onClick={this.props.onClick}>
                                Cancel
                            </Button>
                            <Button className ="reg-btn"disabled={this.props.disabled} onClick={this.props.handleSubmit}>
                                Submit
                            </Button>
                        </Row>
                    </Grid>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditModal