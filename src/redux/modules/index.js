import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from './quiz'
import timer from './timer'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  quiz,
  timer,
  router: routeReducer,
  form: formReducer
})
