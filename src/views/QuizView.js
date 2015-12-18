import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { actions as counterActions } from '../redux/modules/counter'
import LoadingScreen from 'components/LoadingScreen'

const mapStateToProps = (state) => ({
  counter: state.counter
})

class QuizView extends React.Component {
  render () {
    return (
      <LoadingScreen />
    )
  }
}

export default connect(mapStateToProps, counterActions)(QuizView)
