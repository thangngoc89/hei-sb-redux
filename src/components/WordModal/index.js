import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class WordModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
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
          <Modal.Title>Time up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your time is up for this question.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close} bsStyle='primary'>Continue</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default WordModal
