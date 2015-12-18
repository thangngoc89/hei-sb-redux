import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import AboutView from 'views/AboutView'
import LoginView from 'views/LoginView'
import RuleView from 'views/RuleView'

// TODO: Protect QuizView
export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route component={AboutView} path='/about' />
    <Route component={LoginView} path='/login' />
    <Route component={RuleView} path='/rules' />
  </Route>
)
