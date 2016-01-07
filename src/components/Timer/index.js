import { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import raf from 'raf'
import styles from './style.scss'

class Timer extends React.Component {
  constructor (props) {
    super(props)
    this._canvas = null
    this._raf = null
  }

  static defaultProps = {
    size: 300
  };

  componentDidMount () {
    this.scaleSetup()
    this.canvasSetup()
    this.init()
  };

  componentWillReceiveProps (nextProps) {
    this.init(nextProps)

    if (!nextProps.ticking) {
      this.clear()
    }
  };

  componentWillUnmount () {
    this.clear()
  };

  init (props = this.props) {
    this.clear()
    const { seconds, startAt } = props
    // Only draw track
    if (seconds === 0) {
      this.canvasClear()
      this.canvasDrawTrack()
      return
    }

    this._endAt = startAt + seconds * 1000
    this._total = this._endAt - startAt
    this.canvasDraw()
  };

  clear () {
    raf.cancel(this._raf)
  };

  handleTimeout () {
    if (this.props.handleTimeout) {
      this.props.handleTimeout()
    }
  };

  scaleSetup () {
    const size = this.props.size
    this._lineWidth = size / 10
    this._center = size / 2
    this._radius = this._center - (this._lineWidth / 2)
    this._fontSize = this._center / 1.5
  };

  canvasSetup () {
    this._canvas = ReactDOM.findDOMNode(this)
    this._context = this._canvas.getContext('2d')
    this._context.textAlign = 'center'
    this._context.textBaseline = 'middle'
    this._context.font = 'bold ' + this._fontSize + 'px Roboto'
  };

  canvasClear () {
    this._context.clearRect(0, 0, this.props.size, this.props.size)
  };

  // Main draw function
  canvasDraw = () => {
    this.canvasClear()
    this.canvasDrawTrack()
    const remain = this._endAt - Date.now()
    if (remain > 0) {
      this.canvasDrawRemain(this._total, remain)
      this._raf = raf(this.canvasDraw)
    } else {
      this.handleTimeout()
    }
  };

  canvasDrawTrack () {
    this._context.strokeStyle = 'hsla(2, 8%, 46%, 0.45)'
    this._context.lineWidth = this._lineWidth / 2
    this._context.beginPath()
    this._context.arc(this._center, this._center, this._radius, 0, Math.PI * 2)
    this._context.stroke()
  };

  canvasDrawRemain (total, remain) {
    this._context.strokeStyle = 'hsl(2, 8%, 46%)'
    this._context.lineWidth = this._lineWidth
    this._context.fillText((remain / 1000).toFixed(), this._center, this._center)
    this._context.beginPath()
    this._context.arc(
      this._center,
      this._center,
      this._radius,
      Math.PI / -2,
      (Math.PI * 2) * ((remain - total % total) / total) + (Math.PI / -2),
      false
    )
    this._context.stroke()
  };

  render () {
    return (
      <canvas
        width={this.props.size}
        height={this.props.size}
        className={styles.canvas}
      ></canvas>
    )
  }
}

Timer.propTypes = {
  size: PropTypes.number,
  seconds: PropTypes.number.isRequired,
  startAt: PropTypes.number.isRequired,
  ticking: PropTypes.bool.isRequired,
  handleTimeout: PropTypes.func
}

export default Timer
