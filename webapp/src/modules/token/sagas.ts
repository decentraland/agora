import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchTokensSuccess, fetchTokensFailure } from 'modules/token/actions'
import {
  FETCH_TOKENS_REQUEST,
  FETCH_TOKENS_SUCCESS,
  Token
} from 'modules/token/types'
import { computeBalancesRequest } from 'modules/wallet/actions'
import { api } from 'lib/api'

export function* tokenSaga() {
  yield takeLatest(FETCH_TOKENS_REQUEST, handleTokensRequest)
  yield takeLatest(FETCH_TOKENS_SUCCESS, handleTokensSuccess)
}

function* handleTokensRequest() {
  try {
    const tokens: Token[] = yield call(() => api.fetchTokens())
    yield put(fetchTokensSuccess(tokens))
  } catch (error) {
    yield put(fetchTokensFailure(error.message))
  }
}

function* handleTokensSuccess() {
  yield put(computeBalancesRequest())
}
