import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ModalWrapper extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string
  }

  static defaultProps = {
    buttonStyle: 'primary'
  }

  render () {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        backdrop='static'
        bsSize='small'
      >
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.props.close}
            bsStyle={this.props.buttonStyle}
          >
            {this.props.button}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalWrapper
