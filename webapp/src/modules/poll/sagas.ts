import { call, put, takeLatest } from 'redux-saga/effects'
import {
  fetchPollsSuccess,
  fetchPollsFailure,
  fetchPollSuccess,
  fetchPollFailure
} from 'modules/poll/actions'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLL_REQUEST,
  FetchPollRequest,
  Poll,
  PollResponse,
  FetchPollsRequest,
  PollWithPointers
} from 'modules/poll/types'
import { api } from 'lib/api'
import { Token } from 'modules/token/types'

export function* pollSaga() {
  yield takeLatest(FETCH_POLLS_REQUEST, handlePollsRequest)
  yield takeLatest(FETCH_POLL_REQUEST, handlePollRequest)
}

function* handlePollsRequest(action: FetchPollsRequest) {
  try {
    const polls: PollWithPointers[] = yield call(() => api.fetchPolls())

    yield put(fetchPollsSuccess(polls))
  } catch (error) {
    yield put(fetchPollsFailure(error.message))
  }
}

function* handlePollRequest(action: FetchPollRequest) {
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

    yield put(fetchPollSuccess(poll, token as Token, votes, options))
  } catch (error) {
    yield put(fetchPollFailure(error.message))
  }
}
