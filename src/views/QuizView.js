import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../redux/modules/quiz'
import Container from 'layouts/MaterialBox'
import LoadingScreen from 'components/LoadingScreen'
import ErrorScreen from 'components/ErrorScreen'
import Word from 'components/Word'

const mapStateToProps = (state) => ({
  isLoading: state.quiz.get('isLoading'),
  isComplete: state.quiz.get('isComplete'),
  wordList: state.quiz.get('wordList'),
  currentWord: state.quiz.get('currentWord'),
  currentAnswer: state.quiz.get('currentAnswer'),
  timeOut: state.quiz.get('timeOut'),
  error: state.quiz.get('error'),
  audioPlayedTimes: state.quiz.get('audioPlayedTimes')
})

class QuizView extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    wordList: PropTypes.object.isRequired,
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
    const word = this.props.wordList.get(this.props.currentWord)
    return word
  }

  render () {
    let component
    if (this.props.isLoading) {
      component = <LoadingScreen />
    } else if (this.props.error) {
      component =
      <ErrorScreen
        message={this.props.error}
        title='Error while getting word list'
        action={this.props.fetchQuizData}
      />
    } else if (this.props.wordList.count() < 1) {
      // TODO: Use modal for this
      component = <ErrorScreen message='No words are available' title='Logic Error'/>
    } else {
      component =
      <Word
        word={this.currentWord()}
        wordCurrent={this.props.currentWord}
        wordTotal={this.props.wordList.count()}
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
