import { createAction, handleActions } from 'redux-actions'
import request from 'redux/utils/request'
import sortByOrder from 'lodash/collection/sortByOrder'
import moment from 'moment'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_START = '@@leaderboard/fetch/START'
export const FETCH_SUCCESS = '@@leaderboard/fetch/SUCCESS'
export const FETCH_FAILED = '@@leaderboard/fetch/FAILED'
// ------------------------------------
// Actions
// ------------------------------------
export const fetchStart = createAction(FETCH_START)
export const fetchSuccess = createAction(FETCH_SUCCESS)
export const fetchFailed = createAction(FETCH_FAILED)

export const fetch = () => {
  return (dispatch, getState) => {
    const lastUpdate = getState().leaderboard.lastUpdate

    // Don't reload before 10 mins
    if (lastUpdate !== undefined) {
      const diff = moment() - moment(lastUpdate)
      const tenMins = 1000 * 60 * 10 // milisec * min * 10

      if (diff < tenMins) {
        return
      }
    }

    dispatch(fetchStart())
    request('getLeaderboard', null, (err, res) => {
      if (err) {
        const error = (res) ? JSON.parse(res.body.error) : null
        dispatch(fetchFailed(error))
        return
      }
      dispatch(fetchSuccess(res.body.result))
    })
  }
}

export const actions = {
  fetch
}

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  isLoading: true,
  fetchErrorInfo: [],
  fetchSuccess: false,
  lastUpdate: undefined
}

export default handleActions({
  [FETCH_START]: (state) => ({
    ...state,
    isLoading: true
  }),
  [FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    fetchSuccess: true,
    isLoading: false,
    fetchErrorInfo: [],
    data: sortByOrder(payload.data, ['rank'], ['asc']),
    lastUpdate: payload.lastUpdate.iso
  }),
  [FETCH_FAILED]: (state, { payload }) => ({
    ...state,
    fetchSuccess: false,
    fetchErrorInfo: [
      ...state.fetchErrorInfo,
      payload
    ],
    isLoading: false
  })
}, defaultState)
