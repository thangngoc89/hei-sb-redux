import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from './counter'
import quiz from './quiz'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  counter,
  quiz,
  router: routeReducer,
  form: formReducer
})
