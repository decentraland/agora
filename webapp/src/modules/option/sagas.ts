import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchOptionsByPollIdSuccess,
  fetchOptionsByPollIdFailure,
  FETCH_POLL_OPTIONS_REQUEST,
  FetchPollOptionsRequestAction
} from 'modules/option/actions'
import { Option } from 'modules/option/types'
import { api } from 'lib/api'

export function* optionSaga() {
  yield takeLatest(FETCH_POLL_OPTIONS_REQUEST, handlePollOptionsRequest)
}

function* handlePollOptionsRequest(action: FetchPollOptionsRequestAction) {
  try {
    const pollId = action.payload.pollId
    const options: Option[] = yield call(() => api.fetchPollOptions(pollId))

    yield put(fetchOptionsByPollIdSuccess(options, pollId))
  } catch (error) {
    yield put(fetchOptionsByPollIdFailure(error.message))
  }
}
