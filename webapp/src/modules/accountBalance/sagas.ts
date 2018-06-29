import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchAccountBalancesSuccess,
  fetchAccountBalancesFailure
} from 'modules/accountBalance/actions'
import {
  FETCH_ACCOUNT_BALANCES_REQUEST,
  FetchAccountBalancesRequest,
  AccountBalance
} from 'modules/accountBalance/types'
import { api } from 'lib/api'

export function* accountBalanceSaga() {
  yield takeLatest(FETCH_ACCOUNT_BALANCES_REQUEST, handleAccountsRequest)
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
