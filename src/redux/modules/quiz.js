import { createAction,
         handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_REQUEST_DATA = 'QUIZ_REQUEST_DATA'
export const QUIZ_RECEIVE_DATA = 'QUIZ_RECEIVE_DATA'
export const QUIZ_NEXT_WORD = 'QUIZ_NEXT_WORD'

// ------------------------------------
// Actions
// ------------------------------------
export const requestData = createAction(QUIZ_REQUEST_DATA)
export const receiveData = createAction(QUIZ_RECEIVE_DATA, (data) => data)
export const nextWord = createAction(QUIZ_NEXT_WORD)

export const fetchQuizData = () => {
  // Fake a api request here
  let data = require('../data/quiz')

  return (dispatch, getState) => {
    dispatch(requestData())

    setTimeout(() => {
      dispatch(receiveData(data))
    }, 2000)
  }
}

export const actions = {
  fetchQuizData,
  nextWord
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  wordList: [],
  userAnswers: [],
  currentWord: 0,
  isLoading: true,
  isComplete: false
}

export default handleActions({
  QUIZ_REQUEST_DATA: (state, { payload }) => ({...state, isLoading: true}),
  QUIZ_RECEIVE_DATA: (state, { payload }) => ({
    ...state,
    isLoading: false,
    wordList: payload.data.wordList
  }),
  QUIZ_NEXT_WORD: (state) => {
    let nextWord = state.currentWord + 1;
    let isComplete = false;

    if(nextWord >= state.wordList.length){
      isComplete = true;
      nextWord = 0;
    }

    return {
      ...state,
      isComplete,
      currentWord: nextWord
    }
  }
}, defaultState)
