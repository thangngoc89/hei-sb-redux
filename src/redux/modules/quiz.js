import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_REQUEST_DATA = 'QUIZ_REQUEST_DATA'
export const QUIZ_RECEIVE_DATA = 'QUIZ_RECEIVE_DATA'
export const QUIZ_NEXT_WORD = 'QUIZ_NEXT_WORD'
export const QUIZ_RESET = 'QUIZ_RESET'
export const QUIZ_ANSWER_ONCHANGE = 'QUIZ_ANSWER_ONCHANGE'
export const QUIZ_TIMEOUT = 'QUIZ_TIMEOUT'
// ------------------------------------
// Actions
// ------------------------------------
export const requestData = createAction(QUIZ_REQUEST_DATA)
export const receiveData = createAction(QUIZ_RECEIVE_DATA, (data) => data)
export const nextWord = createAction(QUIZ_NEXT_WORD)
export const resetQuiz = createAction(QUIZ_RESET)
export const answerOnChange = createAction(QUIZ_ANSWER_ONCHANGE, (answer) => answer)
export const onTimeOut = createAction(QUIZ_TIMEOUT, (word) => word)

export const fetchQuizData = () => {
  // Fake a api request here
  let data = require('../data/quiz')

  return (dispatch, getState) => {
    dispatch(requestData())

    setTimeout(() => {
      dispatch(receiveData(data))
    }, 500)
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
  QUIZ_RECEIVE_DATA: (state, { payload }) => ({
    ...state,
    isLoading: false,
    wordList: payload.data.wordList
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
