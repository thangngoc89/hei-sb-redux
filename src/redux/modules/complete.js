import { createAction, handleActions } from 'redux-actions'
import request from 'redux/utils/request'
import { userReset } from './user'
import { hardReset } from './quiz'
// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = '@@answers/send/START'
export const SEND_SUCCESS = '@@answers/send/SUCCESS'
export const SEND_ERROR = '@@answers/send/ERROR'
export const COMPLETE_RESET = '@@complete/reset'
// ------------------------------------
// Actions
// ------------------------------------
export const sendStart = createAction(SEND_START)
export const sendSuccess = createAction(SEND_SUCCESS)
export const sendError = createAction(SEND_ERROR)
export const completeReset = createAction(COMPLETE_RESET)

// Send user answers to Parse
// No thing will be returned
export const send = () => {
  return (dispatch, getState) => {
    const postData = {
      contestantId: getState().user.contestantId,
      code: getState().user.code,
      answers: getState().quiz.userAnswers
    }
    dispatch(sendStart())

    request('sendAnswers', postData, (err, res) => {
      if (err) {
        const errorMessage = (res) ? res.body : null
        dispatch(sendError(errorMessage))
        return
      }

      dispatch(sendSuccess())
      dispatch(userReset())
      dispatch(hardReset())
    })
  }
}

export const actions = {
  send,
  completeReset
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  isLoading: true,
  isSuccess: false,
  retry: 0,
  error: false,
  errorMessage: []
}

export default handleActions({
  [SEND_START]: (state) => ({
    ...state,
    isLoading: true,
    error: false,
    retry: state.retry + 1
  }),
  [SEND_SUCCESS]: (state) => ({
    ...state,
    isSuccess: true,
    isLoading: false
  }),
  [SEND_ERROR]: (state, { payload }) => ({
    ...state,
    error: true,
    errorMessage: [
      ...state.errorMessage,
      payload
    ],
    isLoading: false
  }),
  [COMPLETE_RESET]: (state) => defaultState
}, defaultState)
