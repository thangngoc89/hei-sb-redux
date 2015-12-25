import { createAction, handleActions } from 'redux-actions'
import { timerReset } from './timer'
import { actionPlayerReset, actionEnablePlayButton } from './player'
import { pushPath } from 'redux-simple-router'
import request from 'redux/utils/request'
import shuffle from 'lodash.shuffle'
// ------------------------------------
// Constants
// ------------------------------------
export const QUIZ_FETCH_START = '@@quiz/fetch/START'
export const QUIZ_FETCH_SUCCESS = '@@quiz/fetch/SUCCESS'
export const QUIZ_FETCH_ERROR = '@@quiz/fetch/ERROR'

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
export const fetchError = createAction(QUIZ_FETCH_ERROR)

export const nextWord = createAction(QUIZ_NEXT_WORD)
export const actionQuizReset = createAction(QUIZ_RESET)
export const answerOnChange = createAction(QUIZ_ANSWER_ONCHANGE)
export const onTimeout = createAction(QUIZ_TIMEOUT)
export const resetAudioPlayedTimes = createAction(QUIZ_RESET_AUDIO_PLAYED_TIMES)
export const incrementAudioPlayedTimes = createAction(QUIZ_INCREMENT_AUDIO_PLAYED_TIMES)

export const fetchQuizData = () => {
  return (dispatch, getState) => {
    // Fake an API request in development mode
    if (__DEV__) {
      const data = require('redux/data/quiz')
      dispatch(fetchSuccess(data))
      return
    }
    const postData = {
      contestantId: getState().user.contestantId,
      code: getState().user.code
    }
    dispatch(fetchStart())

    request('wordList', postData, (err, res) => {
      if (err) {
        // TODO: Handle error properly
        dispatch(fetchError(err))
        return
      }
      dispatch(fetchSuccess(res.body))
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
    dispatch(actionEnablePlayButton())
    dispatch(timerReset())
    dispatch(nextWord())

    // TODO: Re-consider this
    // Does nexWord() fast enough
    // to get (isComplete === true) here
    if (getState().quiz.isComplete) {
      dispatch(pushPath('/complete'))
    }
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
}

export default handleActions({
  [QUIZ_FETCH_START]: (state, { payload }) => ({...state, isLoading: true}),
  [QUIZ_FETCH_SUCCESS]: (state, { payload }) => {
    let result = shuffle(payload.result)

    return {
      ...state,
      isLoading: false,
      // TODO: Dispatch a reducer to get started
      isStarted: true,
      wordList: result
    }
  },
  [QUIZ_FETCH_ERROR]: (state, { payload }) => ({
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
        [currentWordId]: state.currentAnswer.trim().toLowerCase()
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
  [QUIZ_RESET]: (state) => defaultState,
  [QUIZ_RESET_AUDIO_PLAYED_TIMES]: (state) => ({
    ...state,
    audioPlayedTimes: 0
  }),
  [QUIZ_INCREMENT_AUDIO_PLAYED_TIMES]: (state) => ({
    ...state,
    audioPlayedTimes: state.audioPlayedTimes + 1
  })
}, defaultState)
