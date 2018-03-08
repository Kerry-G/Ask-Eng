import React, { Component } from 'react'
import { Grid, Col, Row, Modal, FormGroup, FormControl, HelpBlock, ControlLabel, Alert, Popover, OverlayTrigger,Button } from 'react-bootstrap'
import Select from 'react-select'

class EditModal extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const Input = this.props.regularInput 
            ? this.props.inputs.map(
                input => { return (
                    <div key={input.title}>
                        <Row>
                            {input.title}
                        </Row>
                        <Row>
                        <textarea
                            className={input.className}
                            rows="1"
                            cols="45"
                            placeholder={input.placeholder}
                            onChange={input.onChange} 
                        />
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
                            <Button onClick={this.props.onClick}>
                                Cancel
                            </Button>
                            <Button disabled={this.props.disabled} onClick={this.props.handleSubmit}>
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