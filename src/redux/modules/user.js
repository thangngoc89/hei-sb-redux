import { createAction, handleActions } from 'redux-actions'
import { pushPath } from 'redux-simple-router'
import request from 'redux/utils/request'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_SAVE_START = 'USER_SAVE_START'
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS'
export const USER_SAVE_FAILED = 'USER_SAVE_FAILED'
export const SHOW_REMINDER_MODAL = 'SHOW_REMINDER_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
// ------------------------------------
// Actions
// ------------------------------------
export const saveStart = createAction(USER_SAVE_START)
export const saveSuccess = createAction(USER_SAVE_SUCCESS)
export const saveFailed = createAction(USER_SAVE_FAILED)
export const showReminderModal = createAction(SHOW_REMINDER_MODAL)
export const closeModal = createAction(CLOSE_MODAL)

export const save = (userInput) => {
  return (dispatch, getState) => {
    dispatch(saveStart())
    request('checkCode', userInput, (err, res) => {
      if (err) {
        const error = JSON.parse(res.body.error)
        dispatch(saveFailed(error))
        return
      }
      dispatch(saveSuccess(res.body.result))
      dispatch(showReminderModal())
    })
  }
}

export const closeReminderModal = () => {
  return (dispatch, getState) => {
    dispatch(closeModal())
    dispatch(pushPath('/quiz'))
  }
}

export const actions = {
  save: save,
  closeModal,
  closeReminderModal
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  code: undefined,
  contestantId: undefined,
  saveSuccess: undefined,
  saveErrorInfo: undefined,
  modal: undefined,
  isSaving: false
}

export default handleActions({
  [USER_SAVE_START]: (state) => ({
    ...state,
    isSaving: true
  }),
  [USER_SAVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    saveSuccess: true,
    saveErrorInfo: undefined,
    isSaving: false
  }),
  [USER_SAVE_FAILED]: (state, { payload }) => ({
    ...state,
    saveSuccess: false,
    saveErrorInfo: payload,
    isSaving: false,
    modal: {
      type: 'error',
      title: 'Oops!',
      body: payload.message,
      button: `I understand. I'll fix it`,
      buttonStyle: 'danger'
    }
  }),
  [CLOSE_MODAL]: (state) => ({
    ...state,
    saveErrorInfo: undefined,
    modal: undefined
  }),
  [SHOW_REMINDER_MODAL]: (state) => ({
    ...state,
    modal: {
      type: 'reminder',
      title: 'Succeed!',
      body: 'You will have ten senconds to answer each questions.',
      button: 'Got it !'
    }
  })
}, defaultState)
