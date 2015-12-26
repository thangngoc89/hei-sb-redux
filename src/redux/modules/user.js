import { createAction, handleActions } from 'redux-actions'
import { pushPath } from 'redux-simple-router'
import request from 'redux/utils/request'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_SAVE_START = '@@user/save/START'
export const USER_SAVE_SUCCESS = '@@user/save/SUCCESS'
export const USER_SAVE_FAILED = '@@user/save/FAILED'
export const SHOW_REMINDER_MODAL = '@@user/modal/SHOW_REMINDER_MODAL'
export const CLOSE_MODAL = '@@user/modal/CLOSE'
export const USER_RESET = '@@user/action/RESET'
// ------------------------------------
// Actions
// ------------------------------------
export const saveStart = createAction(USER_SAVE_START)
export const saveSuccess = createAction(USER_SAVE_SUCCESS)
export const saveFailed = createAction(USER_SAVE_FAILED)
export const showReminderModal = createAction(SHOW_REMINDER_MODAL)
export const closeModal = createAction(CLOSE_MODAL)
export const userReset = createAction(USER_RESET)

export const save = (userInput) => {
  return (dispatch, getState) => {
    dispatch(saveStart())
    request('checkCode', userInput, (err, res) => {
      if (err) {
        const error = (res) ? JSON.parse(res.body.error) : null
        dispatch(saveFailed(error))
        return
      }
      dispatch(saveSuccess(res.body.result))

      const secondsPerWord = getState().quiz.secondsPerWord
      dispatch(showReminderModal(secondsPerWord))
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
  saveErrorInfo: [],
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
  [USER_SAVE_FAILED]: (state, { payload }) => {
    const message = (payload) ? payload.message : 'Looks like you are having a connection issue'
    return {
      ...state,
      saveSuccess: false,
      saveErrorInfo: [
        ...state.saveErrorInfo,
        payload
      ],
      isSaving: false,
      modal: {
        type: 'error',
        title: 'Oops!',
        body: message,
        button: `I understand. I'll fix it`,
        buttonStyle: 'danger'
      }
    }
  },
  [CLOSE_MODAL]: (state) => ({
    ...state,
    modal: undefined
  }),
  [SHOW_REMINDER_MODAL]: (state, { payload }) => ({
    ...state,
    modal: {
      type: 'reminder',
      title: 'Succeed!',
      body: `You will have ${ payload } seconds to answer each question.`,
      button: 'Got it !'
    }
  }),
  [USER_RESET]: (state) => defaultState
}, defaultState)
