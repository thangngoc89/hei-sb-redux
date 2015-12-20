import React, { Component, PropTypes } from 'react'
import CountdownClock from 'components/CountdownClock'

class WordCountdownClockContainer extends Component {
  static propTypes = {
    seconds: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string,
    alpha: PropTypes.number,
    onComplete: PropTypes.func,
    shouldComponentUpdate: PropTypes.bool.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.shouldComponentUpdate
  }

  render () {
    return (
      <CountdownClock {...this.props} />
    )
  }
}

export default WordCountdownClockContainer
