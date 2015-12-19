import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'

class Word extends Component {
  static PropTypes = {
    word: PropTypes.object.isRequired,
    // handleTyping: PropTypes.func.isRequired,
    // handleSubmit: PropTypes.func.isRequired,
    handleNextWord: PropTypes.func.isRequired
  }

  render() {
    let w = this.props.word

    return (
      <div>
        <p>Word render goes here</p>
        <p>word {w.word}</p>
        <p>Filename {w.fileName}</p>
        <Button onClick={this.props.handleNextWord}>
          Next Word
        </Button>
      </div>
    )
  }
}

export default Word
