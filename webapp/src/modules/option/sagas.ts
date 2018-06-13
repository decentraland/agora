import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchOptionsByPollIdSuccess,
  fetchOptionsByPollIdFailure
} from 'modules/option/actions'
import {
  FETCH_POLL_OPTIONS_REQUEST,
  FetchPollOptionsRequest,
  Option
} from 'modules/option/types'
import { api } from 'lib/api'

export function* optionSaga() {
  yield takeLatest(FETCH_POLL_OPTIONS_REQUEST, handlePollOptionsRequest)
}

function* handlePollOptionsRequest(action: FetchPollOptionsRequest) {
  try {
    const pollId = action.payload.pollId
    const options: Option[] = yield call(() => api.fetchPollOptions(pollId))

    yield put(fetchOptionsByPollIdSuccess(options, pollId))
  } catch (error) {
    yield put(fetchOptionsByPollIdFailure(error.message))
  }
}
