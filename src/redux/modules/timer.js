import { createAction, handleActions } from 'redux-actions'
// import { onTimeout as quizOnTimeout } from './quiz'
import { Map } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const TIMER_START = '@@timer/START'
export const TIMER_PAUSE = '@@timer/PAUSE'
export const TIMER_STOP = '@@timer/STOP'
export const TIMER_RESET = '@timer/RESET'
// ------------------------------------
// Actions
// ------------------------------------
export const timerStart = createAction(TIMER_START)
export const timerPause = createAction(TIMER_PAUSE)
export const timerReset = createAction(TIMER_RESET)

export const actions = {
  timerStart,
  timerPause,
  timerReset
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
  seconds: 0,
  startAt: 0,
  ticking: false
})

export default handleActions({
  [TIMER_START]: (state, { payload }) => state.merge({
    seconds: payload,
    startAt: Date.now(),
    ticking: true
  }),
  [TIMER_PAUSE]: (state) => state.set('ticking', false),
  [TIMER_RESET]: (state) => initialState
}, initialState)
