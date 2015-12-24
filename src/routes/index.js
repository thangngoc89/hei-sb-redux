import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import LoginView from 'views/LoginView'
import RuleView from 'views/RuleView'
import QuizView from 'views/QuizView'
import NotFound from 'views/NotFound'
import { store } from 'app'

const requireLogin = (nextState, replaceState, next) => {
  if (__DEV__) {
    next()
  }

  const {user: { code, contestantId }} = store.getState()
  if (!code || !contestantId) {
    replaceState(null, '/')
  }
  next()
}

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={RuleView} />
    <Route component={LoginView} path='/login' />

    { /* Protected routes */ }
    <Route onEnter={requireLogin}>
      <Route component={QuizView} path='/quiz' />
    </Route>

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
