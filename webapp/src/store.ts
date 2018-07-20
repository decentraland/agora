import { env } from 'decentraland-commons'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import createSagasMiddleware from 'redux-saga'

import { createAnalyticsMiddleware } from '@dapps/modules/analytics/middleware'
import { createStorageMiddleware } from '@dapps/modules/storage/middleware'

import { rootReducer } from './reducer'
import { rootSaga } from './sagas'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()

const historyMiddleware = routerMiddleware(history)
const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) =>
    env.isDevelopment() || action.type.includes('Failure')
})
const analyticsMiddleware = createAnalyticsMiddleware(
  env.get('REACT_APP_SEGMENT_API_KEY')
)
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware(
  env.get('REACT_APP_LOCAL_STORAGE_KEY', 'decentraland-agora')
)

const middleware = applyMiddleware(
  historyMiddleware,
  sagasMiddleware,
  loggerMiddleware,
  analyticsMiddleware,
  storageMiddleware
)
const enhancer = composeEnhancers(middleware)
const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (env.isDevelopment()) {
  const _window = window as any
  _window.getState = store.getState
}

export { history, store }
