import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchTokensRequest,
  fetchTokensSuccess,
  fetchTokensFailure
} from 'modules/token/actions'
import { FETCH_TOKENS_REQUEST, Token } from 'modules/token/types'
import { CONNECT_WALLET_SUCCESS } from 'modules/wallet/types'
import { api } from 'lib/api'

export function* tokenSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleWalletSuccess)
  yield takeLatest(FETCH_TOKENS_REQUEST, handleTokensRequest)
}

function* handleWalletSuccess() {
  yield put(fetchTokensRequest())
}

function* handleTokensRequest() {
  try {
    const tokens: Token[] = yield call(() => api.fetchTokens())
    yield put(fetchTokensSuccess(tokens))
  } catch (error) {
    yield put(fetchTokensFailure(error.message))
  }
}
