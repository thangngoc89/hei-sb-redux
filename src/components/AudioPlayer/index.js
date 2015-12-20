import React from 'react'
import classnames from 'classnames'

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: 0,
      playing: !!this.props.autoplay,
      mute: false
    }
  }

  static propTypes = {
    song: React.PropTypes.string.isRequired,
    autoplay: React.PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.song === this.props.song) {
      return
    }
    this.audio.src = nextProps.song
    // Prevent accidentally mute
    this.audio.volume = 1
    this.setState({
      propgress: 0,
      playing: !!nextProps.autoplay,
      mute: false
    })
  }

  componentDidMount () {
    let self = this
    self.audio = document.createElement('audio')
    self.audio.src = self.props.song
    self.audio.autoplay = !!this.props.autoplay

    this.audio.addEventListener('timeupdate', self.updateProgress)
    this.audio.addEventListener('ended', self.playEnd)
    this.audio.addEventListener('error', self.handleError)
  }

  handleError = () => {
    // TODO: handle me properly
    console.log('audio player error')
    console.log(this.audio)
  }

  updateProgress = () => {
    let duration = this.audio.duration
    let currentTime = this.audio.currentTime
    let progress = (currentTime * 100) / duration

    this.setState({
      progress: progress
    })
  }

  setProgress = (e) => {
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
    let width = target.clientWidth
    let rect = target.getBoundingClientRect()
    let offsetX = e.clientX - rect.left
    let duration = this.audio.duration
    let currentTime = (duration * offsetX) / width
    let progress = (currentTime * 100) / duration

    this.audio.currentTime = currentTime

    this.setState({
      progress: progress
    })

    this.play()
  }

  play = () => {
    this.setState({
      playing: true
    })

    this.audio.play()
  }

  pause = () => {
    this.setState({
      playing: false
    })

    this.audio.pause()
  }

  playEnd = () => {
    this.setState({
      playing: false,
      progress: 0
    })
  }

  toggle = () => {
    (this.state.playing) ? this.pause() : this.play()
  }

  toggleMute = () => {
    let mute = this.state.mute

    this.setState({
      mute: !mute
    })

    this.audio.volume = (mute) ? 1 : 0
  }

  render () {
    let playPauseClass = classnames({
      'fa': true,
      'fa-play': !this.state.playing,
      'fa-pause': this.state.playing
    })

    let volumeClass = classnames({
      'fa': true,
      'fa-volume-up': !this.state.mute,
      'fa-volume-off': this.state.mute
    })

    return (
      <div className='player-container'>
        <div className='player-control-wrapper'>
          <div className='player-buttons'>
            <button
              onClick={this.toggle}
              className='player-btn'
              title='Play/Pause'
            >
              <i className={playPauseClass}></i>
            </button>
            <button
              className='player-btn volume'
              onClick={this.toggleMute}
              title='Mute/Unmute'
            >
              <i className={volumeClass}></i>
            </button>
          </div>
        </div>
        <div className='player-progress-wrapper'>
          <div className='player-progress-container' onClick={this.setProgress}>
            <span className='player-progress-value' style={{width: this.state.progress + '%'}}></span>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer
