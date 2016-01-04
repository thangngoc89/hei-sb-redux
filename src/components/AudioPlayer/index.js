import { PropTypes } from 'react'
import { Howl } from 'howler'
import ControlButtons from './ControlButtons'
import raf from 'raf'

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    this._audio = null
    this._rAF = null
    this.state = {
      seek: 0
    }
  }

  componentDidMount () {
    this.initSoundObject()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.song !== this.props.song) {
      this.initSoundObject(nextProps)
      this.setSeekBar(0)
    }
  }

  componentWillUnmount () {
    raf.cancel(this._rAF)
  }

  initSoundObject (props = this.props) {
    this.clearSoundObject()
    this._audio = new Howl({
      src: props.song,
      autoplay: props.autoplay,
      mute: props.mute,
      loop: props.loop,
      onend: this.onEnd,
      onplay: this.onPlay,
      onload: props.onLoad,
      onloaderror: props.onLoadError
    })
  }

  clearSoundObject () {
    if (this._audio) {
      this._audio.stop()
      this._audio.unload()
      this._audio = null
    }
  }

  onPlay = (id) => {
    this.props.onPlay(id)
    this.updateSeek()
  }

  onEnd = (id) => {
    this.props.onEnd(id)
    this.updateSeek()
  }

  updateSeek () {
    if (!this._audio) {
      this.setSeekBar(0)
      raf.cancel(this._rAF)
      return
    }

    const progress = (this._audio.seek() * 100) / this._audio.duration()
    this.setSeekBar(progress)

    // Don't trigger new rAF if audio aren't playing
    if (this._audio.playing()) {
      this._rAF = raf(this.updateSeek.bind(this))
    }
  }

  setSeekBar (seek) {
    seek = (seek > 100) ? 100 : seek
    this.setState({ seek })
  }

  // setProgress = (e) => {
  //   let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
  //   let width = target.clientWidth
  //   let rect = target.getBoundingClientRect()
  //   let offsetX = e.clientX - rect.left
  //   let duration = this.audio.duration
  //   let currentTime = (duration * offsetX) / width
  //   let progress = (currentTime * 100) / duration
  //
  //   this.audio.currentTime = currentTime
  //
  //   this.setState({
  //     progress: progress
  //   })
  //
  //   this.play()
  // }

  actionToggle = () => {
    if (!this._audio.playing()) {
      this._audio.play()
    } else {
      this._audio.pause()
    }

    this.props.actionToggle()
  }

  actionToggleMute = () => {
    this.props.actionToggleMute()
    this._audio.mute(!this.props.mute)
  }

  actionToggleLoop = () => {
    this.props.actionToggleLoop()
    this._audio.loop(!this.props.loop)
  }

  render () {
    return (
      <div className='player-container'>
        <ControlButtons
          buttons={this.props.buttons}
          isLoading={this.props.isLoading}
          isPlaying={this.props.isPlaying}
          mute={this.props.mute}
          loop={this.props.loop}
          canUserToggleAudio={this.props.canUserToggleAudio}
          playButtonAction={this.actionToggle}
          loopButtonAction={this.actionToggleLoop}
          muteButtonAction={this.actionToggleMute}
        />
        <div className='player-progress-wrapper'>
          <div className='player-progress-container' onClick={this.setProgress}>
            <span className='player-progress-value' style={{width: this.state.seek + '%'}}></span>
          </div>
        </div>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  // props
  song: PropTypes.string.isRequired,
  autoplay: PropTypes.bool.isRequired,
  mute: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  buttons: PropTypes.object.isRequired,
  // state
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  canUserToggleAudio: PropTypes.bool.isRequired,
  // action
  actionToggle: PropTypes.func.isRequired,
  actionToggleMute: PropTypes.func.isRequired,
  actionToggleLoop: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onLoadError: PropTypes.func.isRequired
}

export default AudioPlayer
