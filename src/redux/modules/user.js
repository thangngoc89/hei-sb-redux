import { createAction, handleActions } from 'redux-actions'
import { pushPath } from 'redux-simple-router'
import { ParseConfig } from 'redux/config'
import request from 'superagent'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_SAVE = 'USER_SAVE'
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS'
export const USER_SAVE_FAILED = 'USER_SAVE_FAILED'
export const SHOW_REMINDER_MODAL = 'SHOW_REMINDER_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
// ------------------------------------
// Actions
// ------------------------------------
export const save = createAction(USER_SAVE)
export const saveSuccess = createAction(USER_SAVE_SUCCESS, (data) => data)
export const saveFailed = createAction(USER_SAVE_FAILED, (data) => data)
export const showReminderModal = createAction(SHOW_REMINDER_MODAL)
export const closeModal = createAction(CLOSE_MODAL)

export const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(save())
    request.post('https://api.parse.com/1/functions/checkCode')
      .set('X-Parse-Application-Id', ParseConfig.applicationId)
      .send({data: values})
      .set('X-Parse-REST-API-Key', ParseConfig.restKey)
      .end(function (err, res) {
        if (err) {
          let error = JSON.parse(res.body.error)
          dispatch(saveFailed(error))
          reject()
        } else {
          dispatch(saveSuccess(res.body.result))
          dispatch(showReminderModal())
          resolve()
        }
      })
  })
}

export const closeReminderModal = () => {
  return (dispatch, getState) => {
    dispatch(closeModal())
    dispatch(pushPath('/quiz'))
  }
}

export const actions = {
  save: submit,
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
  modal: undefined
}

export default handleActions({
  [USER_SAVE]: (state) => ({...state}),
  [USER_SAVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    saveSuccess: true,
    saveErrorInfo: undefined
  }),
  [USER_SAVE_FAILED]: (state, { payload }) => ({
    ...state,
    saveSuccess: false,
    saveErrorInfo: payload,
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
