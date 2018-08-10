import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'decentraland-ui/lib/styles.css'
import './analytics'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import TranslationProvider from '@dapps/providers/TranslationProvider'
import WalletProvier from '@dapps/providers/WalletProvider'

import Routes from './Routes'
import { store, history } from './store'

import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <WalletProvier>
      <TranslationProvider locales={['en']}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </TranslationProvider>
    </WalletProvier>
  </Provider>,
  document.getElementById('root')
)
