import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
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
    const confirmAction = getState().alert.get('confirmAction')

    if (confirmAction) {
      const module = confirmAction.get('module')
      const action = confirmAction.get('action')
      const dispatchIt = require('./' + module)[action]
      dispatch(dispatchIt())
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
const initialState = Map({
  show: false,
  title: undefined,
  message: undefined,
  confirmAction: null
})

export default handleActions({
  [NOTIFY_SHOW]: (state, { payload }) => state.merge({
    show: true,
    ...payload
  }),
  [NOTIFY_CLOSE]: (state) => initialState
}, initialState)
