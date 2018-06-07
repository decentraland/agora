import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchPollFailure, fetchPollSuccess } from 'modules/poll/actions'
import {
  FETCH_POLL_REQUEST,
  FetchDomainRequest,
  PollWithAssociations,
  Poll,
  PollResponse
} from 'modules/poll/types'
import { api } from 'lib/api'

export function* pollSaga() {
  yield takeLatest(FETCH_POLL_REQUEST, handlePollRequest)
}

function* handlePollRequest(action: FetchDomainRequest) {
  const id = action.payload.id
  try {
    const pollResponse: PollResponse = yield call(() => api.fetchPoll(id))
    if (!pollResponse) throw new Error(`Couldn't find poll ${id}`)
    const { token, votes, options, ...pollAttributes } = pollResponse

    const poll: Poll = {
      ...pollAttributes,
      closes_at: Number(pollAttributes.closes_at),
      balance: Number(pollAttributes.balance)
    }

    yield put(fetchPollSuccess(poll, token, votes, options))
  } catch (error) {
    yield put(fetchPollFailure(error.message))
  }
}
