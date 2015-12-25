import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from './quiz'
import timer from './timer'
import player from './player'
import user from './user'
import complete from './complete'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  complete,
  player,
  timer,
  user,
  quiz,
  router: routeReducer,
  form: formReducer
})
