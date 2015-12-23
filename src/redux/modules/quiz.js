import { createAction, handleActions } from 'redux-actions'
import { timerReset } from './timer'
import { actionPlayerReset } from './player'
import { ParseConfig } from 'redux/config'
import request from 'superagent'
import shuffle from 'lodash.shuffle'
// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_REQUEST_DATA = 'QUIZ_REQUEST_DATA'
export const QUIZ_RECEIVE_DATA = 'QUIZ_RECEIVE_DATA'
export const QUIZ_RECEIVE_DATA_ERROR = 'QUIZ_RECEIVE_DATA_ERROR'
export const QUIZ_NEXT_WORD = 'QUIZ_NEXT_WORD'
export const QUIZ_RESET = 'QUIZ_RESET'
export const QUIZ_ANSWER_ONCHANGE = 'QUIZ_ANSWER_ONCHANGE'
export const QUIZ_TIMEOUT = 'QUIZ_TIMEOUT'
// ------------------------------------
// Actions
// ------------------------------------
export const requestData = createAction(QUIZ_REQUEST_DATA)
export const receiveData = createAction(QUIZ_RECEIVE_DATA, (data) => data)
export const receiveDataError = createAction(QUIZ_RECEIVE_DATA_ERROR, (error) => (error))
export const nextWord = createAction(QUIZ_NEXT_WORD)
export const actionQuizReset = createAction(QUIZ_RESET)
export const answerOnChange = createAction(QUIZ_ANSWER_ONCHANGE, (answer) => answer)
export const onTimeout = createAction(QUIZ_TIMEOUT)

export const fetchQuizData = () => {
  return (dispatch, getState) => {
    // Fake an API request in development mode
    if (__DEV__) {
      let data = require('redux/data/quiz')
      dispatch(receiveData(data))
      return
    }

    dispatch(requestData())

    request.post('https://api.parse.com/1/functions/wordList')
      .set('X-Parse-Application-Id', ParseConfig.applicationId)
      .set('X-Parse-REST-API-Key', ParseConfig.restKey)
      .send()
      .end(function (err, res) {
        if (err) {
          dispatch(receiveDataError(err))
          // TODO: Send request to reset user's code
        } else {
          dispatch(receiveData(res.body))
        }
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
    dispatch(nextWord())
    dispatch(timerReset())
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
let defaultState = {
  secondsPerWord: 10,
  wordList: [],
  userAnswers: {},
  currentAnswer: '',
  error: false,
  currentWord: 0,
  // Show loading indicator
  isLoading: true,
  // Show EndScreen when set to true
  isComplete: false,
  // Show time out modal
  timeOut: false
}

export default handleActions({
  [QUIZ_REQUEST_DATA]: (state, { payload }) => ({...state, isLoading: true}),
  [QUIZ_RECEIVE_DATA]: (state, { payload }) => {
    let result = shuffle(payload.result)

    return {
      ...state,
      isLoading: false,
      wordList: result
    }
  },
  [QUIZ_RECEIVE_DATA_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [QUIZ_NEXT_WORD]: (state) => {
    let nextWord = state.currentWord + 1
    let isComplete = false

    if (nextWord >= state.wordList.length) {
      isComplete = true
      nextWord = 0
    }

    let currentWordId = state.wordList[state.currentWord].id

    return {
      ...state,
      isComplete,
      userAnswers: {
        ...state.userAnswers,
        [currentWordId]: state.currentAnswer
      },
      currentAnswer: '',
      currentWord: nextWord,
      timeOut: false
    }
  },
  [QUIZ_ANSWER_ONCHANGE]: (state, { payload }) => ({
    ...state,
    currentAnswer: payload
  }),
  [QUIZ_TIMEOUT]: (state) => ({
    ...state,
    timeOut: true
  }),
  [QUIZ_RESET]: (state) => defaultState
}, defaultState)
