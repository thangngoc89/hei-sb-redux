import React, { Component, PropTypes } from 'react'
import { Button, Input } from 'react-bootstrap'
import WordNavigator from 'components/WordNavigator'
import CountdownClock from 'components/WordCountdownClockContainer'

class Word extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    wordTotal: PropTypes.number.isRequired,
    wordCurrent: PropTypes.number.isRequired,
    shouldComponentUpdate: PropTypes.bool.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
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
        <WordNavigator
          current={this.props.wordCurrent}
          total={this.props.wordTotal}
        />
        <p>word <em>{w.word}</em></p>
        <p>Filename {w.fileName}</p>

        <CountdownClock
          seconds={10}
          color='#8904B1'
          alpha={0.5}
          size={50}
          shouldComponentUpdate={this.props.shouldComponentUpdate}
        />

        <Input
          type='text'
          label='Type your answer into the field below'
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
