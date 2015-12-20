import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../redux/modules/quiz'
import Container from 'layouts/TransparentContainerLayout'
import { Button } from 'react-bootstrap'
import LoadingScreen from 'components/LoadingScreen'
import ErrorScreen from 'components/ErrorScreen'
import EndScreen from 'components/EndScreen'
import Word from 'components/Word'

const mapStateToProps = (state) => ({
  ...state.quiz
})

class QuizView extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    wordList: PropTypes.array.isRequired,
    currentWord: PropTypes.number.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    // Below props are actions
    fetchQuizData: PropTypes.func.isRequired,
    nextWord: PropTypes.func.isRequired,
    resetQuiz: PropTypes.func,
    answerOnChange: PropTypes.func.isRequired
  }

  componentDidMount () {
    // TODO: Handle data fetching error
    this.props.fetchQuizData()
  }

  currentWord () {
    let word = this.props.wordList[this.props.currentWord]
    if (undefined === word) {
      // TODO: Handle this properly
      // throw 'Word is not defined'
    }
    return word
  }

  render () {
    let component

    if (this.props.isLoading) {
      component = <LoadingScreen />
    } else if (this.props.wordList.length < 1) {
      component = <ErrorScreen message='No words are available' />
    } else if (this.props.isComplete) {
      component = <EndScreen />
    } else {
      component =
      <Word
        word={this.currentWord()}
        handleNextWord={this.props.nextWord}
        handleOnChange={this.props.answerOnChange}
        currentAnswer={this.props.currentAnswer}
      />
    }
    let resetButton = <Button bsStyle='danger' onClick={this.props.resetQuiz}>Reset Quiz</Button>
    return (
      <div>
        <Container xs={12} sm={10} md={8} lg={6} outside={resetButton}>
          { component }
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(QuizView)