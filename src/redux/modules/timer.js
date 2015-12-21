import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
// ------------------------------------
// Actions
// ------------------------------------
export const timerStart = createAction(TIMER_START, (seconds) => seconds)
export const timerTick = createAction(TIMER_TICK)

export const actions = {
  timerStart,
  timerTick
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  startTime: undefined,
  seconds: undefined,
  remain: undefined,
  finished: undefined
}

export default handleActions({
  TIMER_START: (state, { payload }) => ({
    ...state,
    startTime: Date.now(),
    seconds: payload,
    remain: payload,
    finished: false
  }),
  TIMER_TICK: (state, { payload }) => {
    let remain = state.seconds - (state.startTime - Date.now())
    let finished = (remain < 0)

    return {
      ...state,
      remain,
      finished
    }
  }
}, defaultState)
