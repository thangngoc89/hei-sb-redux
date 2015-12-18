import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import counter from './counter'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  counter,
  router: routeReducer,
  form: formReducer
})
