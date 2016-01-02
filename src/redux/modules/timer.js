import { createAction, handleActions } from 'redux-actions'
import { onTimeout as quizOnTimeout } from './quiz'
import { Map } from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_RESET = 'TIMER_RESET'
// ------------------------------------
// Actions
// ------------------------------------
export const timerStart = createAction(TIMER_START, (seconds) => seconds)
export const timerTick = createAction(TIMER_TICK)
export const timerReset = createAction(TIMER_RESET)

export const timerTickWithQuiz = () => {
  return (dispatch, getState) => {
    let remain = (getState().timer.get('remain'))
    // Dispatch on timeout action from quiz
    // on timeout (ofcourse)
    if (remain === 1) {
      dispatch(quizOnTimeout())
    }

    dispatch(timerTick())
  }
}

export const actions = {
  timerStart,
  timerTick: timerTickWithQuiz,
  timerReset
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
  seconds: 0,
  remain: 0,
  ticking: false
})

export default handleActions({
  [TIMER_START]: (state, { payload }) => state.merge({
    seconds: payload,
    remain: payload,
    ticking: true
  }),
  [TIMER_TICK]: (state) => {
    let remain = ((state.get('remain') - 1) < 0) ? 0 : (state.get('remain') - 1)
    let ticking = (remain !== 0)

    return state.merge({
      remain,
      ticking
    })
  },
  [TIMER_RESET]: (state) => initialState
}, initialState)
