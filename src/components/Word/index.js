import React, { Component, PropTypes } from 'react'
import { Button, Input, Row, Col } from 'react-bootstrap'
import WordNavigator from 'components/WordNavigator'
import CountdownClock from 'components/WordCountdownClockContainer'
import WordModal from 'components/WordModal'
import AudioPlayer from 'components/WordAudioPlayerContainer'
import styles from './style.scss'
class Word extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    wordTotal: PropTypes.number.isRequired,
    wordCurrent: PropTypes.number.isRequired,
    shouldComponentUpdate: PropTypes.bool.isRequired,
    isTimeOut: PropTypes.bool.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    handleTimeOut: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleNextWord: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.input.getInputDOMNode().focus()
  }

  componentWillReceiveProps () {
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

  getCurrentWordUrl () {
    // TODO: Fix me. Read me from received data
    let url = 'http://localhost:8000/' + this.props.word.fileName
    return url
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
            <hr />
          </Col>
          <Col xs={4} sm={3} md={2}>
            <CountdownClock
              seconds={10}
              color='#8904B1'
              alpha={0.8}
              size={200}
              onComplete={this.props.handleTimeOut}
              shouldComponentUpdate={this.props.shouldComponentUpdate}
            />
          </Col>
        </Row>

        <AudioPlayer
          song={this.getCurrentWordUrl()}
          autoplay
          shouldComponentUpdate={this.props.shouldComponentUpdate}
        />

        <Input
          type='text'
          label='Type your answer into the field below:'
          ref={(ref) => this.input = ref}
          onChange={this.onChange.bind(this)}
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
