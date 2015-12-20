import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class ReactCountdownClock extends Component {
  constructor (props) {
    super(props)
    this._seconds = 0
    this._radius = null
    this._fraction = null
    this._content = null
    this._canvas = null
  }

  displayName: 'ReactCountdownClock'

  static propTypes = {
    seconds: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
    alpha: PropTypes.number,
    onComplete: PropTypes.func
  }

  static defaultProps = {
    size: 300,
    color: '#000',
    alpha: 1
  }
  componentWillReceiveProps (props) {
    this._seconds = props.seconds
    this._setupTimer()
  }

  componentDidMount () {
    this._seconds = this.props.seconds
    this._setupTimer()
  }

  _setupTimer () {
    this._setScale()
    this._setupCanvas()
    this._drawTimer()
    this._startTimer()
  }

  _updateCanvas () {
    this._clearTimer()
    this._drawTimer()
  }

  _setScale () {
    this._radius = this.props.size / 2
    this._fraction = 2 / this._seconds
    this._tickPeriod = this._seconds * 1.8
  }

  _setupCanvas () {
    this._canvas = ReactDOM.findDOMNode(this)
    this._context = this._canvas.getContext('2d')
    this._context.textAlign = 'center'
    this._context.textBaseline = 'middle'
    this._context.font = 'bold ' + (this._radius / 2) + 'px Arial'
  }

  _startTimer () {
    setTimeout(this._tick(), 200)
  }

  _tick () {
    let start = Date.now()
    let tick = () => {
      let duration = (Date.now() - start) / 1000
      this._seconds -= duration
      if (this._seconds <= 0) {
        this._seconds = 0
        this._handleComplete()
        this._clearTimer()
      } else {
        this._updateCanvas()
        this._tick()
      }
    }

    setTimeout(tick, this._tickPeriod)
  }

  _handleComplete () {
    if (this.props.onComplete) {
      return this.props.onComplete()
    }
  }

  _clearTimer () {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    return this._drawBackground()
  }

  _drawBackground () {
    this._context.beginPath()
    this._context.globalAlpha = this.props.alpha / 3
    this._context.arc(this._radius, this._radius, this._radius, 0, Math.PI * 2, false)
    this._context.arc(this._radius, this._radius, this._radius / 1.8, Math.PI * 2, 0, true)
    this._context.fill()
  }

  _drawTimer () {
    let decimals, percent, ref
    percent = this._fraction * this._seconds + 1.5
    decimals = (ref = this._seconds <= 9.9) != null ? ref : {
      1: 0
    }
    this._context.globalAlpha = this.props.alpha
    this._context.fillStyle = this.props.color
    this._context.fillText(this._seconds.toFixed(decimals), this._radius, this._radius)
    this._context.beginPath()
    this._context.arc(this._radius, this._radius, this._radius, Math.PI * 1.5, Math.PI * percent, false)
    this._context.arc(this._radius, this._radius, this._radius / 1.8, Math.PI * percent, Math.PI * 1.5, true)
    this._context.fill()
  }

  render () {
    return (
      <canvas className='react-countdown-clock' width={this.props.size} height={this.props.size}></canvas>
    )
  }
}

export default ReactCountdownClock
