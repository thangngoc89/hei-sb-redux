import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Timer extends React.Component {
  constructor (props) {
    super(props)
    this._canvas = null
    this._interval = null
  }

  static defaultProps = {
    size: 300
  }

  static propTypes = {
    size: PropTypes.number,
    seconds: PropTypes.number.isRequired,
    remain: PropTypes.number.isRequired,
    tick: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
    startTick: PropTypes.bool.isRequired
  }

  componentDidMount () {
    this.scaleSetup()
    this.canvasSetup()
    this.canvasDraw(this.props)
    if (this.props.startTick) {
      this.tick()
    }
  }

  componentWillReceiveProps (props) {
    this.canvasDraw(props)
    if (props.startTick) {
      this.tick()
    }
  }

  componentWillUnmount () {
    clearInterval(this._interval)
  }

  tick () {
    this.stop()
    this._interval = setInterval(() => {
      if (this.props.remain <= 0) {
        return this.stop()
      }
      this.props.tick()
    }, 1000)
  }

  stop () {
    clearInterval(this._interval)
  }

  scaleSetup () {
    let size = this.props.size
    this._lineWidth = size / 10
    this._center = size / 2
    this._radius = this._center - (this._lineWidth / 2)
    this._fontSize = this._center / 1.5
  }

  canvasSetup () {
    this._canvas = ReactDOM.findDOMNode(this)
    this._context = this._canvas.getContext('2d')
    this._context.textAlign = 'center'
    this._context.textBaseline = 'middle'
    this._context.font = 'bold ' + this._fontSize + 'px Arial'
  }

  canvasClear () {
    this._context.clearRect(0, 0, this.props.size, this.props.size)
  }

  // Handle logic between seconds and remain
  // Redraw everything from scratch each time be called
  canvasDraw ({remain, seconds}) {
    this.canvasClear()
    this.canvasDrawTrack()
    if (!seconds || !remain) return
    if (remain <= 0) return
    if (remain > seconds) {
      console.error('LOGIC_ERROR: Remaining seconds can not be larger than total seconds')
      return
    }

    this.canvasDrawRemain(remain, seconds)
  }

  canvasDrawTrack () {
    this._context.strokeStyle = 'hsla(2, 8%, 46%, 0.45)'
    this._context.lineWidth = this._lineWidth / 2
    this._context.beginPath()
    this._context.arc(this._center, this._center, this._radius, 0, Math.PI * 2)
    this._context.stroke()
  }

  canvasDrawRemain (remain, seconds) {
    this._context.strokeStyle = 'hsl(2, 8%, 46%)'
    this._context.lineWidth = this._lineWidth
    this._context.fillText(remain, this._center, this._center)
    this._context.beginPath()
    this._context.arc(
      this._center,
      this._center,
      this._radius,
      Math.PI / -2,
      (Math.PI * 2) * ((remain - seconds % seconds) / seconds) + (Math.PI / -2),
      false
    )
    this._context.stroke()
  }

  render () {
    return (
      <canvas width={this.props.size} height={this.props.size}></canvas>
    )
  }
}

export default Timer
