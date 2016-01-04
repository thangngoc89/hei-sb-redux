import { PropTypes } from 'react'
import moment from 'moment'

class LastUpdate extends React.Component {
  constructor (props) {
    super(props)

    this._interval = null
    this.state = {
      timeString: moment(this.props.time).fromNow()
    }
  }

  static propTypes = {
    time: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired
  }

  componentDidMount () {
    this.tick()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.time !== this.props.time) {
      this.tick()
    }
  }

  componentWillUnmount () {
    this.stop()
  }

  tick () {
    this.stop()
    this._interval = setInterval(() => {
      this.updateTime()
    }, this.props.interval * 1000)
  }

  stop () {
    if (this._interval) {
      clearInterval(this._interval)
    }
  }

  updateTime () {
    const timeString = moment(this.props.time).fromNow()
    if (timeString !== this.state.timeString) {
      this.setState({
        timeString
      })
    }
  }

  render () {
    return (
      <p>Last update: {this.state.timeString}</p>
    )
  }
}

export default LastUpdate
