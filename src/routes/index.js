import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import LoginView from 'views/LoginView'
import RuleView from 'views/RuleView'
import QuizView from 'views/QuizView'

// TODO: Protect QuizView
export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={RuleView} />
    <Route component={LoginView} path='/login' />
    <Route component={HomeView} path='/home' />
    <Route component={QuizView} path='/quiz' />
  </Route>
)
