import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const USER_SAVE = 'USER_SAVE'
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS'
export const USER_SAVE_FAILED = 'USER_SAVE_FAILED'
// ------------------------------------
// Actions
// ------------------------------------
export const save = createAction(USER_SAVE)
export const saveSuccess = createAction(USER_SAVE_SUCCESS, (data) => data)
export const saveFailed = createAction(USER_SAVE_FAILED)

export const saveData = () => {
  return (dispatch, getState) => {
    
  }
}

export const actions = {
  save: saveData
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  code: undefined,
  isSuccess: undefined
}

export default handleActions({
  [USER_SAVE]: (state) => ({...state}),
  [USER_SAVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isSuccess: true
  }),
  [USER_SAVE_FAILED]: (state, { payload }) => ({
    ...state,
    isSuccess: false
  })
}, defaultState)
