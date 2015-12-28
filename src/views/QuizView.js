import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../redux/modules/quiz'
import Container from 'layouts/TransparentContainerLayout'
import LoadingScreen from 'components/LoadingScreen'
import ErrorScreen from 'components/ErrorScreen'
import Word from 'components/Word'

const mapStateToProps = (state) => ({
  ...state.quiz
})

class QuizView extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    wordList: PropTypes.array.isRequired,
    currentWord: PropTypes.number.isRequired,
    currentAnswer: PropTypes.string.isRequired,
    timeOut: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    audioPlayedTimes: PropTypes.number.isRequired,
    // Below props are actions
    fetchQuizData: PropTypes.func.isRequired,
    nextWord: PropTypes.func.isRequired,
    answerOnChange: PropTypes.func.isRequired,
    hardReset: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.hardReset()
    this.props.fetchQuizData()
  }

  currentWord () {
    let word = this.props.wordList[this.props.currentWord]
    if (undefined === word) {
      throw new Error('Word is not defined')
    }
    return word
  }

  render () {
    let component

    if (this.props.isLoading) {
      component = <LoadingScreen />
    } else if (this.props.error) {
      component = <ErrorScreen message={this.props.error} title='Error while getting word list' />
    } else if (this.props.wordList.length < 1) {
      // TODO: Use modal for this
      component = <ErrorScreen message='No words are available' title='Logic Error'/>
    } else {
      component =
      <Word
        word={this.currentWord()}
        wordCurrent={this.props.currentWord}
        wordTotal={this.props.wordList.length}
        handleNextWord={this.props.nextWord}
        handleOnChange={this.props.answerOnChange}
        currentAnswer={this.props.currentAnswer}
        audioPlayedTimes={this.props.audioPlayedTimes}
        isTimeOut={this.props.timeOut}
      />
    }

    return (
      <Container xs={12} sm={10} md={8} lg={6}>
        { component }
      </Container>
    )
  }
}

export default connect(mapStateToProps, counterActions)(QuizView)
