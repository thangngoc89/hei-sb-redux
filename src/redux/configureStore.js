import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import notify from 'redux/middlewares/notify'
import notifyEvents from 'redux/events/notifyEvents'

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore (initialState) {
  let createStoreWithMiddleware

  const middleware = applyMiddleware(thunk, notify(notifyEvents))

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('containers/DevTools').instrument()
    )
  } else {
    createStoreWithMiddleware = compose(middleware)
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  )
  if (module.hot) {
    module.hot.accept('redux/rootReducer', () => {
      const nextRootReducer = require('redux/rootReducer')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
