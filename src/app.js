import { syncReduxAndRouter } from 'redux-simple-router'
import Root from './containers/Root'
import routes from './routes'
import history from './routes/history'
import store from './redux/store'

syncReduxAndRouter(history, store, (state) => state.router)

// We render the DevTools window here rather than in the Root component
// because we need access to the store but want this logic to be removed via
// uglification and dead code removal when __DEBUG_NW__ is false, which
// wouldn't be possible if it was handled via a React component prop.
if (__DEBUG__ && __DEBUG_NEW_WINDOW__) {
  require('./redux/utils/createDevToolsWindow')(store)
}

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
)
