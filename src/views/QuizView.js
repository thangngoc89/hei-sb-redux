import React from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../redux/modules/quiz'
import LoadingScreen from 'components/LoadingScreen'

const mapStateToProps = (state) => ({
  isLoading: state.quiz.isLoading
})

class QuizView extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    fetchQuizData: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchQuizData()
  }

  render () {
    let component

    if (this.props.isLoading) {
      component = <LoadingScreen />
    }
    return (
      <div>
        { component }
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(QuizView)
