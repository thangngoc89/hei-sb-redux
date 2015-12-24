import { createAction, handleActions } from 'redux-actions'
import { actions as timerActions } from './timer'
// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_ACTION_CHANGE_SOURCE = '@@player/action/CHANGE_SOURCE'
export const PLAYER_ACTION_PLAY = '@@player/action/PLAY'
export const PLAYER_ACTION_TOGGLE = '@@player/action/TOGGLE'
export const PLAYER_ACTION_VOLUME = '@@player/action/VOLUME'
export const PLAYER_ACTION_TOGGLE_MUTE = '@@player/action/TOGGLE_MUTE'
export const PLAYER_ACTION_TOGGLE_LOOP = '@@player/action/TOGGLE_LOOP'
export const PLAYER_ACTION_UPDATE_SEEK = '@@player/action/UPDATE_SEEK'
export const PLAYER_ENABLE_PLAY_BUTTON = '@@player/action/ENABLE_PLAY_BUTTON'
export const PLAYER_DISABLE_PLAY_BUTTON = '@@player/action/DISABLE_PLAY_BUTTON'
export const PLAYER_RESET = '@@player/action/PLAYER_RESET'

export const PLAYER_ON_PLAY = '@@player/event/ON_PLAY'
export const PLAYER_ON_END = '@@player/event/ON_END'
export const PLAYER_ON_LOAD = '@@player/event/ON_LOAD'
// ------------------------------------
// Actions
// ------------------------------------
export const actionChangeSource = createAction(PLAYER_ACTION_CHANGE_SOURCE, (url) => url)
export const actionPlay = createAction(PLAYER_ACTION_PLAY)
export const actionToggle = createAction(PLAYER_ACTION_TOGGLE)
export const actionVolume = createAction(PLAYER_ACTION_VOLUME, (volume) => volume)
export const actionToggleMute = createAction(PLAYER_ACTION_TOGGLE_MUTE)
export const actionToggleLoop = createAction(PLAYER_ACTION_TOGGLE_LOOP)
// TODO: Implement seek
export const actionUpdateSeek = createAction(PLAYER_ACTION_UPDATE_SEEK, (seek) => seek)
export const actionPlayerReset = createAction(PLAYER_RESET)
// Event from howler.js
export const onPlay = createAction(PLAYER_ON_PLAY)
export const onEnd = createAction(PLAYER_ON_END)
export const onLoad = createAction(PLAYER_ON_LOAD)

export const onPlayWithTimer = () => {
  return (dispatch, getState) => {
    dispatch(onPlay())

    // Only start a new timer when timer is not ticking
    if (!getState().timer.ticking) {
      let seconds = getState().quiz.secondsPerWord
      dispatch(timerActions.timerStart(seconds))
    }
  }
}

export const actions = {
  actionChangeSource,
  actionPlay,
  actionToggle,
  actionVolume,
  actionToggleMute,
  actionToggleLoop,
  actionUpdateSeek,
  onPlay: onPlayWithTimer,
  onEnd,
  onLoad
}

// ------------------------------------
// Reducer
// ------------------------------------
let defaultState = {
  isPlaying: false,
  isLoading: false,
  autoplay: true,
  mute: false,
  volume: 1,
  seek: 0,
  loop: false,
  canUserPlay: true,
  buttons: {
    LoadingButton: false,
    LoopButton: false,
    MuteButton: false,
    PlayButton: true
  }
}

export default handleActions({
  [PLAYER_ACTION_CHANGE_SOURCE]: (state, { payload }) => {
    // TODO: Handle url validation here
    return {
      ...state,
      song: payload
    }
  },
  [PLAYER_ACTION_PLAY]: (state) => ({
    ...state,
    isPlaying: true
  }),
  [PLAYER_ACTION_TOGGLE]: (state) => ({
    ...state,
    isPlaying: !state.isPlaying
  }),
  [PLAYER_ACTION_VOLUME]: (state, { payload }) => {
    if (typeof payload !== 'number') {
      throw new TypeError('Volume has to be a float between 0 and 1')
    }

    return {
      ...state,
      volume: payload
    }
  },
  [PLAYER_ACTION_TOGGLE_MUTE]: (state) => ({
    ...state,
    mute: !state.mute
  }),
  [PLAYER_ON_LOAD]: (state) => ({
    ...state,
    isLoading: true,
    isPlaying: false
  }),
  [PLAYER_ON_PLAY]: (state) => ({
    ...state,
    isLoading: false,
    isPlaying: true
  }),
  [PLAYER_ON_END]: (state) => ({
    ...state,
    isPlaying: false,
    isLoading: false,
    seek: 0
  }),
  [PLAYER_ACTION_UPDATE_SEEK]: (state, { payload }) => ({
    ...state,
    seek: payload
  }),
  [PLAYER_ACTION_TOGGLE_LOOP]: (state) => ({
    ...state,
    loop: !state.loop
  }),
  [PLAYER_RESET]: (state) => defaultState
}, defaultState)
