import { createAction, handleActions } from 'redux-actions'
import request from 'redux/utils/request'
import sortByOrder from 'lodash/collection/sortByOrder'
import moment from 'moment'
import { fromJS, List } from 'immutable'
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
    const lastUpdate = getState().leaderboard.get('lastUpdate')

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
        const error = (res) ? res.body : null
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
export const initialState = fromJS({
  isLoading: true,
  fetchErrorInfo: [],
  fetchSuccess: undefined,
  lastUpdate: undefined
})

export default handleActions({
  [FETCH_START]: (state) => state.set('isLoading', true),
  [FETCH_SUCCESS]: (state, { payload }) => state.merge({
    fetchSuccess: true,
    isLoading: false,
    fetchErrorInfo: List(),
    data: sortByOrder(payload.data, ['rank'], ['asc']),
    lastUpdate: payload.lastUpdate.iso
  }),
  [FETCH_FAILED]: (state, { payload }) => state.merge({
    fetchSuccess: false,
    fetchErrorInfo: state.get('fetchErrorInfo').push(payload),
    isLoading: false
  })
}, initialState)
