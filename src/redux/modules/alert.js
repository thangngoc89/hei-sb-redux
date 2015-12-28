import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFY_SHOW = '@@alert/action/NOTIFY_SHOW'
export const NOTIFY_CLOSE = '@@alert/action/NOTIFY_CLOSE'
// ------------------------------------
// Actions
// ------------------------------------
export const notify = createAction(NOTIFY_SHOW)
export const close = createAction(NOTIFY_CLOSE)

export const closeNotify = () => {
  return (dispatch, getState) => {
    const confirmAction = getState().alert.confirmAction

    if (confirmAction) {
      const module = require('./' + confirmAction.module)[confirmAction.action]
      dispatch(module())
    }

    dispatch(close())
  }
}
export const actions = {
  notify,
  close: closeNotify
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  show: false,
  title: undefined,
  message: undefined,
  confirmAction: null
}

export default handleActions({
  [NOTIFY_SHOW]: (state, { payload }) => ({
    ...state,
    show: true,
    ...payload
  }),
  [NOTIFY_CLOSE]: (state) => defaultState
}, defaultState)
