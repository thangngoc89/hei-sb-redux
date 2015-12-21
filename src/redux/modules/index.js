import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from './quiz'
import timer from './timer'
import player from './player'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  quiz,
  timer,
  player,
  router: routeReducer,
  form: formReducer
})
