import { select, put, takeLatest } from 'redux-saga/effects'
import { navigateTo } from '@dapps/modules/location/actions'
import { CONNECT_WALLET_SUCCESS } from '@dapps/modules/wallet/actions'
import { locations } from 'locations'
import { isSignIn } from './selectors'

export function* locationSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess() {
  if (yield select(isSignIn)) {
    yield put(navigateTo(locations.root()))
  }
}
