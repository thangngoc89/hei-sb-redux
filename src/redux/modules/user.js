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
export const CLOSE_MODAL = 'CLOSE_MODAL'
// ------------------------------------
// Actions
// ------------------------------------
export const save = createAction(USER_SAVE)
export const saveSuccess = createAction(USER_SAVE_SUCCESS, (data) => data)
export const saveFailed = createAction(USER_SAVE_FAILED, (data) => data)
export const closeModal = createAction(CLOSE_MODAL)

export const saveData = (values) => {
  return (dispatch, getState) => {
    dispatch(save())
    request.post('https://api.parse.com/1/functions/checkCode')
      .set('X-Parse-Application-Id', ParseConfig.applicationId)
      .send({data: values})
      .set('X-Parse-REST-API-Key', ParseConfig.restKey)
      .end(function (err, res) {
        if (err) {
          let error = JSON.parse(res.body.error)
          dispatch(saveFailed(error))
        } else {
          dispatch(saveSuccess(res.body.result))
          // TODO: Don't redirect to quiz page immedialy
          // Show a modal for reminding
          // Also in quiz view, reset to initial state onComponentWillUnmount
          dispatch(pushPath('/quiz'))
        }
      })
  }
}

export const actions = {
  save: saveData,
  closeModal
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  code: undefined,
  contestantId: undefined,
  isSuccess: undefined,
  errorObject: undefined
}

export default handleActions({
  [USER_SAVE]: (state) => ({...state}),
  [USER_SAVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    isSuccess: true,
    errorObject: undefined
  }),
  [USER_SAVE_FAILED]: (state, { payload }) => ({
    ...state,
    isSuccess: false,
    errorObject: payload
  }),
  [CLOSE_MODAL]: (state) => ({
    ...state,
    errorObject: undefined
  })
}, defaultState)
