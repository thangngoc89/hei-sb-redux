import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import RuleView from 'views/RuleView'
import QuizView from 'views/QuizView'
import LoginView from 'views/LoginView'
import CompleteView from 'views/CompleteView'
import LeaderboardView from 'views/LeaderboardView'
import NotFound from 'views/NotFound'
import store from 'redux/store'

const requireLogin = (nextState, replaceState, next) => {
  if (__DEV__) {
    next()
    return
  }
  const {
    user: { code, contestantId },
    quiz: { isComplete }
  } = store.getState()
  if (!code || !contestantId) {
    replaceState(null, '/')
  }
  // Redirect to /complete view when completed
  if (isComplete) {
    replaceState(null, '/complete')
  }
  next()
}

// Am I need this
const hasToDoneExamFirst = (nextState, replaceState, next) => {
  if (__DEV__) {
    next()
    return
  }
  const {quiz: { isComplete }} = store.getState()
  if (!isComplete) {
    replaceState(null, '/quiz')
  }
  next()
}

// const loadContainerAsync = view => (location, cb) => {
//   require.ensure([], (require) => {
//     cb(null, require('views/' + view))
//   })
// }

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={RuleView} />
    <Route component={LoginView} path='/login' />

    { /* Protected routes */ }
    <Route onEnter={requireLogin}>
      <Route component={QuizView} path='/quiz' />
    </Route>

    <Route onEnter={hasToDoneExamFirst}>
      <Route component={CompleteView} path='/complete' />
    </Route>

    <Route component={LeaderboardView} path='/leaderboard' />

    { /* Catch all route */ }
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
