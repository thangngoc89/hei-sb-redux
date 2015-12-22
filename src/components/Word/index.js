import React, { Component, PropTypes } from 'react'
import { Button, Input, Row, Col } from 'react-bootstrap'
import WordNavigator from 'components/WordNavigator'
import Timer from 'components/WordTimerContainer'
import WordModal from 'components/WordModal'
import AudioPlayer from 'components/WordAudioPlayerContainer'
import styles from './style.scss'

class Word extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    wordTotal: PropTypes.number.isRequired,
    wordCurrent: PropTypes.number.isRequired,
    isTimeOut: PropTypes.bool.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleNextWord: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.input.getInputDOMNode().focus()
  }

  componentWillReceiveProps () {
    this.input.getInputDOMNode().focus()
  }

  onInputChange (e) {
    let input = e.target.value
    this.props.handleOnChange(input)
  }

  nextWord (e) {
    this.props.handleNextWord()
    this.input.getInputDOMNode().focus()
  }

  getCurrentWordUrl () {
    return this.props.word.soundFile
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={8} sm={9} md={10}>
            <WordNavigator
              current={this.props.wordCurrent}
              total={this.props.wordTotal}
            />
            <p>Current word: {this.props.word.word}</p>
            <hr />
          </Col>
          <Col xs={4} sm={3} md={2}>
            <Timer />
          </Col>
        </Row>

        <AudioPlayer
          song={this.getCurrentWordUrl()}
        />

        <Input
          type='text'
          label='Type your answer into the field below:'
          ref={(ref) => this.input = ref}
          onChange={this.onInputChange.bind(this)}
          value={this.props.currentAnswer}
          groupClassName={styles['input-wrapper']}
        />

        <Row>
          <Col xs={12}>
            <Button
              onClick={this.nextWord.bind(this)}
              className='pull-right'
              bsStyle='primary'
            >
              Submit
            </Button>
          </Col>
        </Row>

        <WordModal
          show={this.props.isTimeOut}
          close={this.nextWord.bind(this)}
        />
      </div>
    )
  }
}

export default Word
