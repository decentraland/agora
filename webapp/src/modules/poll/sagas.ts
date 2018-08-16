import { call, put, takeEvery } from 'redux-saga/effects'
import {
  fetchPollsSuccess,
  fetchPollsFailure,
  fetchPollSuccess,
  fetchPollFailure,
  FETCH_POLLS_REQUEST,
  FETCH_POLL_REQUEST,
  FetchPollRequestAction,
  FetchPollsRequestAction
} from 'modules/poll/actions'
import {
  Poll,
  PollResponse,
  PollsResponse,
  PollWithAssociations
} from 'modules/poll/types'
import { api } from 'lib/api'

export function* pollSaga() {
  yield takeEvery(FETCH_POLLS_REQUEST, handlePollsRequest)
  yield takeEvery(FETCH_POLL_REQUEST, handlePollRequest)
}

function* handlePollsRequest(action: FetchPollsRequestAction) {
  try {
    const filters = action.payload
    const response: PollsResponse = yield call(() => api.fetchPolls(filters))
    const polls: PollWithAssociations[] = response.polls.map(
      (poll: PollResponse) => ({
        ...poll,
        balance: Number(poll.balance),
        closes_at: Number(poll.closes_at)
      })
    )
    yield put(fetchPollsSuccess(polls, response.total, filters))
  } catch (error) {
    yield put(fetchPollsFailure(error.message))
  }
}

function* handlePollRequest(action: FetchPollRequestAction) {
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
