import { PropTypes, Component } from 'react'
import TimerCanvas from './TimerCanvas'
import raf from 'raf'

class Timer extends Component {
  constructor (props) {
    super(props)
    this._raf = null
    this.tick = this.tick.bind(this)
    this.state = {
      percentage: 0,
      text: ''
    }
  }

  componentDidMount () {
    this.setUpVars()
    this.tick()
  }

  /**
   * React to props changed
   * @param  {Prop} props
   */
  componentWillReceiveProps (props) {
    /**
     * Shallow compare
     */
    if (props.startAt !== this.props.startAt && props.seconds !== this.props.seconds) {
      this.setUpVars(props)
      this.tick()
    }
    if (!props.ticking) {
      this.clear()
    }
  }

  componentWillUnmount () {
    this.clear()
  }

  /**
   * Set up seconds, endAt and total vars
   * Avoid using state for a better performance
   * (compare 2 values vs 5)
   */
  setUpVars (props = this.props) {
    const { startAt, seconds } = props
    this.seconds = seconds
    this.endAt = startAt + seconds * 1000
    this.total = this.endAt - startAt
  }

  /**
   * Calculate remaining percentage and trigger requestAnimationFrame
   */
  tick () {
    if (this.seconds === 0) {
      this.setState({
        percentage: 0,
        text: ''
      })
      return
    }

    const remain = this.endAt - Date.now()

    this.setState({
      text: (remain < 0) ? 0 : (remain / 1000).toFixed(),
      percentage: remain / this.total
    })

    if (remain > 0) {
      this._raf = raf(this.tick)
    } else {
      this.handleTimeout()
    }
  }

  /**
   * Clear requestAnimationFrame
   */
  clear () {
    raf.cancel(this._raf)
  }

  /**
   * Call handleTimeout function passed via props
   */
  handleTimeout () {
    if (this.props.handleTimeout) {
      this.props.handleTimeout()
    }
  }

  render () {
    return (
      <TimerCanvas
        size={this.props.size}
        percentage={this.state.percentage}
        text={this.state.text.toString()}
      />
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

Timer.defaultProps = {
  size: 300
}

export default Timer
