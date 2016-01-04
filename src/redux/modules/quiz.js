import { createAction, handleActions } from 'redux-actions'
import { timerReset } from './timer'
import { actionPlayerReset, actionEnablePlayButton, onLoad } from './player'
import { pushPath } from 'redux-simple-router'
import { notify } from 'redux/modules/alert'
import { fromJS } from 'immutable'
import request from 'redux/utils/request'
import shuffle from 'lodash/collection/shuffle'
// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_FETCH_START = '@@quiz/fetch/START'
export const QUIZ_FETCH_SUCCESS = '@@quiz/fetch/SUCCESS'
export const QUIZ_FETCH_FAILED = '@@quiz/fetch/FAILED'

export const QUIZ_NEXT_WORD = '@@quiz/action/NEXT_WORD'
export const QUIZ_RESET = '@@quiz/action/RESET'
export const QUIZ_ANSWER_ONCHANGE = '@@quiz/action/ANSWER_ONCHANGE'
export const QUIZ_RESET_AUDIO_PLAYED_TIMES = '@@quiz/action/RESET_PLAYED_TIMES'
export const QUIZ_INCREMENT_AUDIO_PLAYED_TIMES = '@@quiz/action/INCREMENT_PLAYED_TIMES'
export const QUIZ_TIMEOUT = '@@quiz/event/TIMEOUT'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchStart = createAction(QUIZ_FETCH_START)
export const fetchSuccess = createAction(QUIZ_FETCH_SUCCESS)
export const fetchFailed = createAction(QUIZ_FETCH_FAILED)

export const nextWord = createAction(QUIZ_NEXT_WORD)
export const actionQuizReset = createAction(QUIZ_RESET)
export const answerOnChange = createAction(QUIZ_ANSWER_ONCHANGE)
export const onTimeout = createAction(QUIZ_TIMEOUT)
export const resetAudioPlayedTimes = createAction(QUIZ_RESET_AUDIO_PLAYED_TIMES)
export const incrementAudioPlayedTimes = createAction(QUIZ_INCREMENT_AUDIO_PLAYED_TIMES)

export const fetchQuizData = () => {
  return (dispatch, getState) => {
    // Fake an API request in development mode
    // if (__DEV__) {
    //   console.log('it called me')
    //   dispatch(fetchStart())
    //   const data = require('redux/data/quiz')
    //   dispatch(fetchSuccess(data))
    //   return
    // }

    const postData = {
      contestantId: getState().user.get('contestantId'),
      code: getState().user.get('code')
    }
    dispatch(fetchStart())
    request('wordList', postData, (err, res) => {
      if (err) {
        const error = (res) ? JSON.parse(res.body.error) : 'No connection'
        dispatch(fetchFailed(error))
        return
      }
      const data = shuffle(res.body.result)
      dispatch(fetchSuccess(data))
    })
  }
}

export const hardReset = () => {
  return (dispatch, getState) => {
    dispatch(actionQuizReset())
    dispatch(actionPlayerReset())
    dispatch(timerReset())
  }
}

export const actionNextWordWithTimer = () => {
  return (dispatch, getState) => {
    dispatch(resetAudioPlayedTimes())
    dispatch(onLoad())
    dispatch(actionEnablePlayButton())
    dispatch(timerReset())
    dispatch(nextWord())

    // TODO: Re-consider this
    // Does nexWord() fast enough
    // to get (isComplete === true) here
    if (getState().quiz.get('isComplete')) {
      dispatch(pushPath('/complete'))
    }
  }
}

export const showTimeoutModal = () => {
  return (dispatch, getState) => {
    const alert = {
      title: 'Time up!',
      message: 'Your time is up for this question',
      button: 'Continue',
      confirmAction: {
        module: 'quiz',
        action: 'actionNextWordWithTimer'
      }
    }
    dispatch(notify(alert))
  }
}

export const actions = {
  fetchQuizData,
  nextWord: actionNextWordWithTimer,
  answerOnChange,
  hardReset,
  onTimeout
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = fromJS({
  secondsPerWord: 15,
  wordList: [],
  userAnswers: {},
  currentAnswer: '',
  error: false,
  currentWord: 0,
  // Show loading indicator
  isLoading: true,
  // Start && complete state
  isStarted: false,
  isComplete: false,
  // Show time out modal
  timeOut: false,
  audioPlayedTimes: 0
})

export default handleActions({
  [QUIZ_FETCH_START]: (state) => state.set('isLoading', true),
  [QUIZ_FETCH_SUCCESS]: (state, { payload }) => state.merge({
    isLoading: false,
    isStarted: true,
    wordList: fromJS(payload)
  }),
  [QUIZ_FETCH_FAILED]: (state, { payload }) => state.merge({
    error: payload,
    isLoading: false
  }),
  [QUIZ_NEXT_WORD]: (state) => {
    let nextWord = state.get('currentWord') + 1
    let isComplete = false

    if (nextWord >= state.get('wordList').count()) {
      isComplete = true
      nextWord = 0
    }
    const currentWordIndex = state.get('currentWord')
    const currentWordId = state.get('wordList').get(currentWordIndex).get('id')

    return state.merge({
      isComplete,
      userAnswers: state.get('userAnswers').merge({
        [currentWordId]: state.get('currentAnswer').trim().toLowerCase()
      }),
      currentAnswer: '',
      currentWord: nextWord,
      timeOut: false
    })
  },
  [QUIZ_ANSWER_ONCHANGE]: (state, { payload }) => state.set('currentAnswer', payload),
  [QUIZ_TIMEOUT]: (state) => state.set('timeOut', true),
  [QUIZ_RESET_AUDIO_PLAYED_TIMES]: (state) => state.set('audioPlayedTimes', 0),
  [QUIZ_INCREMENT_AUDIO_PLAYED_TIMES]: (state) =>
    state.set('audioPlayedTimes', state.get('audioPlayedTimes') + 1),
  [QUIZ_RESET]: (state) => initialState
}, initialState)
