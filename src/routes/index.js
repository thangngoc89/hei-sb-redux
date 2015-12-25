import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import RuleView from 'views/RuleView'
import NotFound from 'views/NotFound'
import store from 'redux/store'

const requireLogin = (nextState, replaceState, next) => {
  if (__DEV__) {
    next()
    return
  }
  const {user: { code, contestantId }} = store.getState()
  if (!code || !contestantId) {
    replaceState(null, '/')
  }
  next()
}

const loadContainerAsync = view => (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('views/' + view))
  })
}

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={RuleView} />
    <Route getComponent={loadContainerAsync('LoginView')} path='/login' />

    { /* Protected routes */ }
    <Route onEnter={requireLogin}>
      <Route getComponent={loadContainerAsync('QuizView')} path='/quiz' />
      <Route getComponent={loadContainerAsync('CompleteView')} path='/complete' />
    </Route>

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
