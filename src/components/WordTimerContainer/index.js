import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as timerActions } from 'redux/modules/timer'
import Timer from 'components/Timer'

const mapStateToProps = (state) => ({
  ...state.timer
})

class WordTimerContainer extends Component {
  render () {
    return (
      <Timer
        {...this.props}
      />
    )
  }
}

export default connect(mapStateToProps, timerActions)(WordTimerContainer)