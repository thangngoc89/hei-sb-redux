import React, { Component, PropTypes } from 'react'
import { Button, Input } from 'react-bootstrap'

class Word extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    // handleSubmit: PropTypes.func.isRequired,
    handleNextWord: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.input.getInputDOMNode().focus()
  }

  onChange (e) {
    let input = e.target.value
    this.props.handleOnChange(input)
  }

  nextWord (e) {
    this.props.handleNextWord()
    this.input.getInputDOMNode().focus()
  }

  render () {
    let w = this.props.word

    return (
      <div>
        <p>Word render goes here</p>
        <p>word {w.word}</p>
        <p>Filename {w.fileName}</p>

        <Input
          type='text'
          label='Your answer'
          ref={(ref) => this.input = ref}
          onChange={this.onChange.bind(this)}
          value={this.props.currentAnswer}
        />

        <Button onClick={this.nextWord.bind(this)}>
          Next Word
        </Button>
      </div>
    )
  }
}

export default Word
