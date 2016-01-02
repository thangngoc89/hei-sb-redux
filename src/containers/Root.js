import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Modal from 'containers/Modal'
import ToolboxApp from 'react-toolbox/lib/app'

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow')(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools')
        return <DevTools />
      }
    }
  }
  render () {
    return (
      <ToolboxApp>
        <Provider store={this.props.store}>
          <div style={{height: '100%', 'paddingTop': '3rem'}}>
            {this.content}
            {this.devTools}
            <Modal />
          </div>
        </Provider>
      </ToolboxApp>
    )
  }
}
