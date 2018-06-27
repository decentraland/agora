import { takeLatest, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccess
} from 'modules/wallet/types'
import { getAnalytics } from 'modules/analytics/utils'

export function* analyticsSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeEvery(LOCATION_CHANGE, handleLocationChange)
}

// Identify users
function handleConnectWalletSuccess(action: ConnectWalletSuccess) {
  const { wallet } = action.payload
  const analytics = getAnalytics()

  if (analytics) {
    analytics.identify(wallet.address)
  }
}

// Track pages
function handleLocationChange() {
  const analytics = getAnalytics()

  if (analytics) {
    analytics.page()
  }
}
