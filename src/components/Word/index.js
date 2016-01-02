import { Component, PropTypes } from 'react'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import WordNavigator from 'components/WordNavigator'
import Timer from 'containers/TimerContainer'
import AudioPlayer from 'containers/AudioPlayerContainer'

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

  onInputChange (name, value) {
    this.props.handleOnChange(value)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.handleNextWord()
    this.focusOnInput()
  }

  focusOnInput () {
    this.input.focus()
  }

  getCurrentWordUrl () {
    return this.props.word.soundFile
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-7 col-sm-8 col-md-9'>
            <WordNavigator
              current={this.props.wordCurrent}
              total={this.props.wordTotal}
            />
            <hr />
          </div>
          <div className='col-xs-5 col-sm-4 col-md-3'>
            <Timer size={100} />
          </div>
        </div>

        <AudioPlayer
          song={this.getCurrentWordUrl()}
        />
        <p>You played this audio {this.props.audioPlayedTimes} time(s).</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='row'>
          <div className='col-xs-12'>
            <Input
              primary
              raised
              type='text'
              label='Type your answer into the field below'
              ref={(ref) => this.input = ref}
              name='answer'
              onChange={this.onInputChange.bind(this, 'answer')}
              value={this.props.currentAnswer}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <Button
              type='submit'
              className='pull-right'
              bsStyle='primary'
              disabled={(this.props.currentAnswer === '')}
            >
              Submit
            </Button>
          </div>
        </div>
        </form>
      </div>
    )
  }
}

export default Word
