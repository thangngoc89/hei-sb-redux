import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Howl } from 'howler'

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
    // state
    isPlaying: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
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
      this._audio.unload()
      this._audio = null
    }
    this.stop()
  }

  onPlay = (id) => {
    this.props.onPlay(id)
    // this.tick()
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
    let playPauseClass = classnames({
      'fa': true,
      'fa-play': !this.props.isPlaying,
      'fa-pause': this.props.isPlaying,
      'hide': this.props.isLoading
    })

    let loadingClass = classnames({
      'fa fa-circle-o-notch fa-spin': this.props.isLoading,
      'hide': !this.props.isLoading
    })

    // let volumeClass = classnames({
    //   'fa': true,
    //   'fa-volume-up': !this.props.mute,
    //   'fa-volume-off': this.props.mute
    // })

    let loopClass = classnames({
      'player-btn': true,
      'loop': true,
      'active': this.props.loop
    })

    return (
      <div className='player-container'>
        <div className='player-control-wrapper'>
          <div className='player-buttons'>
            <button
              className='player-btn'
              title='Loading'
            >
              <i className={loadingClass}></i>
            </button>
            <button
              onClick={this.actionToggle}
              className='player-btn'
              title='Play/Pause'
            >
              <i className={playPauseClass}></i>
            </button>
            <button
              className={loopClass}
              onClick={this.actionToggleLoop}
              title='Repeat'
            >
              <i className='fa fa-repeat'></i>
            </button>
          </div>
        </div>
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
