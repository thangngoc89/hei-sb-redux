import { createAction, handleActions } from 'redux-actions'
import request from 'redux/utils/request'
// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = '@@answers/send/START'
export const SEND_SUCCESS = '@@answers/send/SUCCESS'
export const SEND_ERROR = '@@answers/send/ERROR'
// ------------------------------------
// Actions
// ------------------------------------
export const sendStart = createAction(SEND_START)
export const sendSuccess = createAction(SEND_SUCCESS)
export const sendError = createAction(SEND_ERROR)

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
        dispatch(sendError(res.body))
        return
      }

      dispatch(sendSuccess())
    })
  }
}

export const actions = {
  send
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
  })
}, defaultState)
