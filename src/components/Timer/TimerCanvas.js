import { PropTypes } from 'react'
import styles from './style.scss'

class TimerCanvas extends React.Component {
  constructor (props) {
    super(props)
    this._canvas = null
    this._percentage = props.percentage
    this._text = props.text
  }

  componentDidMount () {
    this.scaleSetup()
    this.canvasSetup()
    this.canvasDraw()
  }

  componentWillReceiveProps (props) {
    this._percentage = props.percentage
    this._text = props.text
    /**
     * Recalculate scale and redraw canvas
     */
    if (props.size !== this.props.size) {
      this.scaleSetup()
      this.canvasDraw()
    }

    /**
     * Redraw canvas when percentage changed
     */
    if (props.percentage !== this.props.percentage) {
      this.canvasDraw()
    }
  }

  /**
   * Calculate canvas component size base on props.size
   */
  scaleSetup () {
    const size = this.props.size
    this._lineWidth = size / 10
    this._center = size / 2
    this._radius = this._center - (this._lineWidth / 2)
    this._fontSize = this._center / 1.5
  }

  /**
   * Config canvas DOM node and its context
   */
  canvasSetup () {
    this._canvas = ReactDOM.findDOMNode(this)
    this._context = this._canvas.getContext('2d')
    this._context.textAlign = 'center'
    this._context.textBaseline = 'middle'
    this._context.font = 'bold ' + this._fontSize + 'px Roboto'
  }

  /**
   * Draw canvas from scatch
   * Class this if we need a re-draw
   */
  canvasDraw () {
    this.canvasClear()
    this.canvasDrawTrack()
    if (this._text && this._percentage) {
      this.canvasDrawRemain()
    }
  }

  /**
   * Clear existing canvas
   */
  canvasClear () {
    this._context.clearRect(0, 0, this.props.size, this.props.size)
  }

  /**
   * Draw inner stroke
   */
  canvasDrawTrack () {
    this._context.strokeStyle = 'hsla(2, 8%, 46%, 0.45)'
    this._context.lineWidth = this._lineWidth / 2
    this._context.beginPath()
    this._context.arc(this._center, this._center, this._radius, 0, Math.PI * 2)
    this._context.stroke()
  }

  /**
   * Draw outer stroke and text
   */
  canvasDrawRemain () {
    this._context.strokeStyle = 'hsl(2, 8%, 46%)'
    this._context.lineWidth = this._lineWidth
    this._context.fillText(this._text, this._center, this._center)
    this._context.beginPath()
    this._context.arc(
      this._center,
      this._center,
      this._radius,
      Math.PI / -2,
      (Math.PI * 2) * this._percentage + (Math.PI / -2),
      false
    )
    this._context.stroke()
  }

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

TimerCanvas.propTypes = {
  size: PropTypes.number.isRequired,
  percentage: PropTypes.number,
  text: PropTypes.string
}

export default TimerCanvas
