import { createAction, handleActions } from 'redux-actions'
import request from 'redux/utils/request'
import { userReset } from './user'
import { hardReset } from './quiz'
import { notify } from 'redux/modules/alert'
import { fromJS } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const SEND_START = '@@answers/send/START'
export const SEND_SUCCESS = '@@answers/send/SUCCESS'
export const SEND_FAILED = '@@answers/send/FAILED'
export const COMPLETE_RESET = '@@complete/reset'
// ------------------------------------
// Actions
// ------------------------------------
export const sendStart = createAction(SEND_START)
export const sendSuccess = createAction(SEND_SUCCESS)
export const sendFailed = createAction(SEND_FAILED)
export const completeReset = createAction(COMPLETE_RESET)

// Send user answers to Parse
export const send = () => {
  return (dispatch, getState) => {
    const postData = {
      contestantId: getState().user.get('contestantId'),
      code: getState().user.get('code'),
      answers: getState().quiz.get('userAnswers')
    }
    dispatch(sendStart())

    request('sendAnswers', postData, (err, res) => {
      if (err) {
        const errorMessage = (res) ? res.body : null
        dispatch(sendFailed(errorMessage))
        return
      }

      dispatch(sendSuccess(res.body.result))
      dispatch(userReset())
      dispatch(hardReset())
    })
  }
}

export const showRetryModal = () => {
  return (dispatch, getState) => {
    const alert = {
      title: 'Oh snap!',
      message: `There was a problem while trying to send your answers to us.
        \nPlease check your internet connection and wait a few seconds before click on the RETRY button below.`,
      buttonStyle: 'danger',
      button: 'Retry',
      confirmAction: {
        module: 'complete',
        action: 'send'
      }
    }
    dispatch(notify(alert))
  }
}

export const showScoreModal = ({ payload }) => {
  return (dispatch, getState) => {
    const alert = {
      title: 'Congratulations !',
      message: `You scored ${getState().complete.get('score')} / 30 points`,
      button: 'Great'
    }
    dispatch(notify(alert))
  }
}

export const actions = {
  send,
  completeReset
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = fromJS({
  isLoading: true,
  isSuccess: false,
  retry: 0,
  errorMessage: []
})

export default handleActions({
  [SEND_START]: (state) => state.merge({
    isLoading: true,
    retry: state.get('retry') + 1
  }),
  [SEND_SUCCESS]: (state, { payload }) => state.merge({
    isSuccess: true,
    isLoading: false,
    score: payload.score
  }),
  [SEND_FAILED]: (state, { payload }) => state.merge({
    errorMessage: state.get('errorMessage').push(payload),
    isLoading: false
  }),
  [COMPLETE_RESET]: (state) => initialState
}, initialState)
