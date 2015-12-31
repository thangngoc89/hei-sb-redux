import { Component, PropTypes } from 'react'
import { Button, Input, Row, Col } from 'react-bootstrap'
import WordNavigator from 'components/WordNavigator'
import Timer from 'components/WordTimerContainer'
import AudioPlayer from 'components/WordAudioPlayerContainer'
import styles from './style.scss'

class Word extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    wordTotal: PropTypes.number.isRequired,
    wordCurrent: PropTypes.number.isRequired,
    isTimeOut: PropTypes.bool.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    audioPlayedTimes: PropTypes.number.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleNextWord: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.focusOnInput()
  }

  onInputChange (e) {
    let input = e.target.value
    this.props.handleOnChange(input)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.handleNextWord()
    this.focusOnInput()
  }

  focusOnInput () {
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
            <hr />
          </Col>
          <Col xs={4} sm={3} md={2}>
            <Timer size={100} />
          </Col>
        </Row>

        <AudioPlayer
          song={this.getCurrentWordUrl()}
        />
        <p>You played this audio {this.props.audioPlayedTimes} time(s).</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
              type='submit'
              className='pull-right'
              bsStyle='primary'
              disabled={(this.props.currentAnswer === '')}
            >
              Submit
            </Button>
          </Col>
        </Row>
        </form>
      </div>
    )
  }
}

export default Word
