import * as quiz from 'redux/modules/quiz'
import data from 'redux/data/quiz'
import createAction from 'redux-actions'

describe('(redux) quiz --> actions', () => {
  it('should create an action to request data', () => {
    expect(quiz.fetchStart()).to.deep.equal({
      type: quiz.QUIZ_FETCH_START,
      payload: undefined
    })
  })

  it('should create an action to receive data', () => {
    const data = {foo: 'bar'}

    expect(quiz.fetchSuccess(data)).to.deep.equal({
      type: quiz.QUIZ_FETCH_SUCCESS,
      payload: data
    })
  })

  it('should create an action to handle request data error', () => {
    const data = {}

    expect(quiz.fetchFailed(data)).to.deep.equal({
      type: quiz.QUIZ_FETCH_FAILED,
      payload: data
    })
  })

  it('should create an action to handle next word transition', () => {
    expect(quiz.nextWord()).to.deep.equal({
      type: quiz.QUIZ_NEXT_WORD,
      payload: undefined
    })
  })

  it('should create an action to reset quiz', () => {
    expect(quiz.actionQuizReset()).to.deep.equal({
      type: quiz.QUIZ_RESET,
      payload: undefined
    })
  })

  it('should create an action to handle answer input onchange event', () => {
    expect(quiz.answerOnChange()).to.deep.equal({
      type: quiz.QUIZ_ANSWER_ONCHANGE,
      payload: undefined
    })
  })

  it('should create an action to handle time out event', () => {
    expect(quiz.onTimeout()).to.deep.equal({
      type: quiz.QUIZ_TIMEOUT,
      payload: undefined
    })
  })

  it('should create an action to reset audio played times', () => {
    expect(quiz.resetAudioPlayedTimes()).to.deep.equal({
      type: quiz.QUIZ_RESET_AUDIO_PLAYED_TIMES,
      payload: undefined
    })
  })

  it('should create an action to increase audio played times', () => {
    expect(quiz.incrementAudioPlayedTimes()).to.deep.equal({
      type: quiz.QUIZ_INCREMENT_AUDIO_PLAYED_TIMES,
      payload: undefined
    })
  })
})
