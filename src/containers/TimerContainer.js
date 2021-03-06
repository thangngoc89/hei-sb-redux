import { connect } from 'react-redux'
import { actions as timerActions } from 'redux/modules/timer'
import Timer from 'components/Timer'

const mapStateToProps = (state) => ({
  seconds: state.timer.get('seconds'),
  startAt: state.timer.get('startAt'),
  ticking: state.timer.get('ticking')
})

class WordTimerContainer extends React.Component {
  render () {
    return (
      <Timer
        {...this.props}
      />
    )
  }
}

export default connect(mapStateToProps, timerActions)(WordTimerContainer)
