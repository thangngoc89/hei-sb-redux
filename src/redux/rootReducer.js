import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from 'redux/modules/quiz'
import timer from 'redux/modules/timer'
import player from 'redux/modules/player'
import user from 'redux/modules/user'
import complete from 'redux/modules/complete'
import alert from 'redux/modules/alert'
import leaderboard from 'redux/modules/leaderboard'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  complete,
  player,
  timer,
  user,
  quiz,
  alert,
  leaderboard,
  router: routeReducer,
  form: formReducer
})
