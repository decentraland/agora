import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchAccountBalancesRequest,
  fetchAccountBalancesSuccess,
  fetchAccountBalancesFailure
} from 'modules/account/actions'
import {
  FETCH_ACCOUNT_BALANCES_REQUEST,
  FetchAccountBalancesRequest,
  AccountBalance
} from 'modules/account/types'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccess
} from 'modules/wallet/types'
import { api } from 'lib/api'

export function* accountSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleWalletSuccess)
  yield takeLatest(FETCH_ACCOUNT_BALANCES_REQUEST, handleAccountsRequest)
}

function* handleWalletSuccess(action: ConnectWalletSuccess) {
  yield put(fetchAccountBalancesRequest(action.payload.wallet.address))
}

function* handleAccountsRequest(action: FetchAccountBalancesRequest) {
  try {
    const address = action.payload.address
    const accounts: AccountBalance[] = yield call(() =>
      api.fetchAccountBalances(address)
    )

    yield put(fetchAccountBalancesSuccess(accounts))
  } catch (error) {
    yield put(fetchAccountBalancesFailure(error.message))
  }
}
