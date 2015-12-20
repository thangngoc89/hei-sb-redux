import { createAction, handleActions } from 'redux-actions'
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
export const resetQuiz = createAction(QUIZ_RESET)
export const answerOnChange = createAction(QUIZ_ANSWER_ONCHANGE, (answer) => answer)
export const onTimeOut = createAction(QUIZ_TIMEOUT, (word) => word)

export const fetchQuizData = () => {
  // curl -X POST \
  //   -H "X-Parse-Application-Id: wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX" \
  //   -H "X-Parse-REST-API-Key: sViFSueciljQ1aTmNwAJ9vTHbE9zcIEwMCSXzx20" \
  //   https://api.parse.com/1/functions/wordList
  return (dispatch, getState) => {
    dispatch(requestData())

    request.post('https://api.parse.com/1/functions/wordList')
      .set('X-Parse-Application-Id', 'wUyaZGM0qPNvr2DvKOgGTJSPXa1GWcHV3v3otEiX')
      .set('X-Parse-REST-API-Key', 'sViFSueciljQ1aTmNwAJ9vTHbE9zcIEwMCSXzx20')
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

export const actions = {
  fetchQuizData,
  nextWord,
  answerOnChange,
  onTimeOut,
  resetQuiz
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  wordList: [],
  userAnswers: {},
  currentAnswer: '',
  error: false,
  currentWord: 0,
  // Show loading indicator
  isLoading: true,
  // Show EndScreen when set to true
  isComplete: false,
  // Should clock and audio player re-render?
  shouldComponentUpdate: true,
  // Show time out modal
  timeOut: false
}

export default handleActions({
  QUIZ_REQUEST_DATA: (state, { payload }) => ({...state, isLoading: true}),
  QUIZ_RECEIVE_DATA: (state, { payload }) => {
    let result = shuffle(payload.result)

    return {
      ...state,
      isLoading: false,
      wordList: result
    }
  },
  QUIZ_RECEIVE_DATA_ERROR: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  QUIZ_NEXT_WORD: (state) => {
    let nextWord = state.currentWord + 1
    let isComplete = false

    if (nextWord >= state.wordList.length) {
      isComplete = true
      nextWord = 0
    }

    return {
      ...state,
      isComplete,
      userAnswers: {
        ...state.userAnswers,
        [state.currentWord]: state.currentAnswer
      },
      currentAnswer: '',
      currentWord: nextWord,
      shouldComponentUpdate: true,
      timeOut: false
    }
  },
  QUIZ_RESET: (state) => ({
    ...defaultState,
    isLoading: false,
    wordList: state.wordList
  }),
  QUIZ_ANSWER_ONCHANGE: (state, { payload }) => ({
    ...state,
    currentAnswer: payload,
    shouldComponentUpdate: false
  }),
  QUIZ_TIMEOUT: (state) => ({
    ...state,
    timeOut: true,
    // Prevent clock being update and re-render twice
    shouldComponentUpdate: false
  })
}, defaultState)
