import { createAction, handleActions } from 'redux-actions'
import { pushPath } from 'redux-simple-router'
import request from 'redux/utils/request'
import { notify } from 'redux/modules/alert'
import { fromJS, List } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_SAVE_START = '@@user/save/START'
export const USER_SAVE_SUCCESS = '@@user/save/SUCCESS'
export const USER_SAVE_FAILED = '@@user/save/FAILED'
export const USER_RESET = '@@user/action/RESET'
// ------------------------------------
// Actions
// ------------------------------------
export const saveStart = createAction(USER_SAVE_START)
export const saveSuccess = createAction(USER_SAVE_SUCCESS)
export const saveFailed = createAction(USER_SAVE_FAILED)
export const userReset = createAction(USER_RESET)

export const save = (userInput) => {
  return (dispatch, getState) => {
    // Remove spaces in phone number
    userInput.phone = userInput.phone.replace(/\s/g, '')
    dispatch(saveStart())
    request('checkCode', userInput, (err, res) => {
      if (err) {
        const error = (res) ? JSON.parse(res.body.error) : null
        dispatch(saveFailed(error))
        return
      }
      dispatch(saveSuccess(res.body.result))
    })
  }
}

export const showSaveFailedAlert = ({ payload }) => {
  return (dispatch, getState) => {
    const message = (payload) ? payload.message : 'Looks like you are having a connection issue'
    const alert = {
      title: 'Oops!',
      message: message,
      button: `OK. I'll fix it`,
      buttonStyle: 'danger'
    }
    dispatch(notify(alert))
  }
}

export const showReminderModal = () => {
  return (dispatch, getState) => {
    const secondsPerWord = getState().quiz.get('secondsPerWord')
    const alert = {
      title: 'Login succeed',
      message: `You will have ${ secondsPerWord } seconds to answer each question.`,
      button: 'Got it!',
      confirmAction: {
        module: 'user',
        action: 'closeReminderModal'
      }
    }

    dispatch(notify(alert))
  }
}

export const closeReminderModal = () => {
  return (dispatch, getState) => {
    dispatch(pushPath('/quiz'))
  }
}

export const actions = {
  save,
  closeReminderModal
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = fromJS({
  code: undefined,
  contestantId: undefined,
  saveSuccess: undefined,
  saveErrorInfo: [],
  isSaving: false
})

export default handleActions({
  [USER_SAVE_START]: (state) => state.merge({
    isSaving: true
  }),
  [USER_SAVE_SUCCESS]: (state, { payload }) => state.merge({
    ...payload,
    saveSuccess: true,
    saveErrorInfo: List(),
    isSaving: false
  }),
  [USER_SAVE_FAILED]: (state, { payload }) => state.merge({
    saveSuccess: false,
    saveErrorInfo: state.get('saveErrorInfo').push(payload),
    isSaving: false
  }),
  [USER_RESET]: (state) => initialState
}, initialState)
