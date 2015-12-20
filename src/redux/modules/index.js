import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import quiz from './quiz'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  quiz,
  router: routeReducer,
  form: formReducer
})
