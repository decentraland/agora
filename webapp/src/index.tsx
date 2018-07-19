import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'decentraland-ui/lib/styles.css'
import './analytics'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Routes from './Routes'
import { store, history } from './store'

import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
