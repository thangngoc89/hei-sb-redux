import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from './quiz'
import timer from './timer'
import player from './player'
import user from './user'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  quiz,
  timer,
  player,
  user,
  router: routeReducer,
  form: formReducer
})
