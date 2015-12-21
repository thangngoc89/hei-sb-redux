import { createAction, handleActions } from 'redux-actions'
// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_ACTION_CHANGE_SOURCE = 'PLAYER_ACTION_CHANGE_SOURCE'
export const PLAYER_ACTION_PLAY = 'PLAYER_ACTION_PLAY'
export const PLAYER_ACTION_TOGGLE = 'PLAYER_ACTION_TOGGLE'
export const PLAYER_ACTION_VOLUME = 'PLAYER_ACTION_VOLUME'
export const PLAYER_ACTION_TOGGLE_MUTE = 'PLAYER_ACTION_TOGGLE_MUTE'
export const PLAYER_ACTION_TOGGLE_LOOP = 'PLAYER_ACTION_TOGGLE_LOOP'
export const PLAYER_ACTION_UPDATE_SEEK = 'PLAYER_ACTION_UPDATE_SEEK'
export const PLAYER_ON_PLAY = 'PLAYER_ON_PLAY'
export const PLAYER_ON_END = 'PLAYER_ON_END'
export const PLAYER_ON_LOAD = 'PLAYER_ON_LOAD'
// ------------------------------------
// Actions
// ------------------------------------
export const actionChangeSource = createAction(PLAYER_ACTION_CHANGE_SOURCE, (url) => url)
export const actionPlay = createAction(PLAYER_ACTION_PLAY)
export const actionToggle = createAction(PLAYER_ACTION_TOGGLE)
export const actionVolume = createAction(PLAYER_ACTION_VOLUME, (volume) => volume)
export const actionToggleMute = createAction(PLAYER_ACTION_TOGGLE_MUTE)
export const actionToggleLoop = createAction(PLAYER_ACTION_TOGGLE_LOOP)
export const actionUpdateSeek = createAction(PLAYER_ACTION_UPDATE_SEEK, (seek) => seek)
// Event from howler.js
export const onPlay = createAction(PLAYER_ON_PLAY)
export const onEnd = createAction(PLAYER_ON_END)
export const onLoad = createAction(PLAYER_ON_LOAD)

export const actions = {
  actionChangeSource,
  actionPlay,
  actionToggle,
  actionVolume,
  actionToggleMute,
  actionToggleLoop,
  actionUpdateSeek,
  onPlay,
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
  loop: true
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
  [PLAYER_ON_PLAY]: (state) => ({
    ...state,
    isPlaying: true
  }),
  [PLAYER_ON_END]: (state) => ({
    ...state,
    isPlaying: false,
    seek: 0
  }),
  [PLAYER_ACTION_UPDATE_SEEK]: (state, { payload }) => ({
    ...state,
    seek: payload
  }),
  [PLAYER_ACTION_TOGGLE_LOOP]: (state) => ({
    ...state,
    loop: !state.loop
  })
}, defaultState)
