import React, { PropTypes } from 'react'
import { Howl } from 'howler'
import ControlButtons from './ControlButtons'

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    this._audio = null
    this._interval = null
  }

  static propTypes = {
    // props
    song: PropTypes.string.isRequired,
    autoplay: PropTypes.bool.isRequired,
    mute: PropTypes.bool.isRequired,
    loop: PropTypes.bool.isRequired,
    seek: PropTypes.number.isRequired,
    buttons: PropTypes.object.isRequired,
    // state
    isPlaying: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    canUserToggleAudio: PropTypes.bool.isRequired,
    // action
    actionToggle: PropTypes.func.isRequired,
    actionToggleMute: PropTypes.func.isRequired,
    actionToggleLoop: PropTypes.func.isRequired,
    actionUpdateSeek: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.initSoundObject()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.song !== this.props.song) {
      this.initSoundObject(nextProps)
    }
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
      onloaderror: this.onLoadError
    })
  }

  clearSoundObject () {
    if (this._audio) {
      this._audio.stop()
      // Also update seek when stop for a better UX
      this.props.actionUpdateSeek(0)
      this._audio.unload()
      this._audio = null
    }
    this.stop()
  }

  onPlay = (id) => {
    this.props.onPlay(id)
    this.tick()
  }

  onEnd = (id) => {
    this.props.onEnd(id)
    this.stop()
  }

  onLoadError = (id, message) => {
    throw new Error(message)
  }

  tick () {
    this.stop()
    this._interval = setInterval(() => {
      this.updateSeek()
    }, 1000 / 30)
  }

  stop () {
    if (this._interval) {
      clearInterval(this._interval)
    }
  }

  updateSeek () {
    let duration = this._audio.duration()
    let currentTime = this._audio.seek()
    let progress = (currentTime * 100) / duration

    this.props.actionUpdateSeek(progress)
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
      this.stop()
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
          {...this.props}
          playButtonAction={this.actionToggle}
          loopButtonAction={this.actionToggleLoop}
          muteButtonAction={this.actionToggleMute}
        />
        <div className='player-progress-wrapper'>
          <div className='player-progress-container' onClick={this.setProgress}>
            <span className='player-progress-value' style={{width: this.props.seek + '%'}}></span>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
