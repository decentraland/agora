import { select, call, put, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { eth } from 'decentraland-eth'
import { locations } from 'locations'
import {
  fetchVotesByPollIdSuccess,
  fetchVotesByPollIdFailure,
  createVoteSuccess,
  createVoteFailure
} from 'modules/vote/actions'
import {
  FETCH_POLL_VOTES_REQUEST,
  CREATE_VOTE_REQUEST,
  FetchPollVotesRequest,
  Vote,
  CreateVoteRequest
} from 'modules/vote/types'
import { Wallet } from 'modules/wallet/types'
import { getWallet } from 'modules/wallet/selectors'
import { getPolls } from 'modules/poll/selectors'
import { getData as getOptions } from 'modules/option/selectors'
import { getBalanceInPoll } from 'modules/wallet/utils'
import { api } from 'lib/api'

export function* voteSaga() {
  yield takeLatest(FETCH_POLL_VOTES_REQUEST, handlePollOptionsRequest)
  yield takeLatest(CREATE_VOTE_REQUEST, handleVoteRequest)
}

function* handlePollOptionsRequest(action: FetchPollVotesRequest) {
  try {
    const pollId = action.payload.pollId
    const votes: Vote[] = yield call(() => api.fetchPollVotes(pollId))

    yield put(fetchVotesByPollIdSuccess(votes, pollId))
  } catch (error) {
    yield put(fetchVotesByPollIdFailure(error.message))
  }
}

function* handleVoteRequest(action: CreateVoteRequest) {
  // TODO: We could add optimistic update before this
  try {
    const newVote = action.payload.newVote
    const wallet: Wallet = yield select(getWallet)

    const polls: ReturnType<typeof getPolls> = yield select(getPolls)
    const poll = polls[newVote.poll_id]

    const options: ReturnType<typeof getOptions> = yield select(getOptions)
    const option = options[newVote.option_id]

    const payload = `==== TEST VERSION ====
Poll Id: ${poll.id}
Poll Title: ${poll.title}
Poll Description: ${poll.description || ''}
Option Id: ${option.id}
Option Value: ${option.value}
Current Balance: ${getBalanceInPoll(wallet, poll)}
Token: ${poll.token.symbol}
Timestamp: ${newVote.timestamp}
    `
    const { message, signature } = yield call(() => eth.sign(payload))
    // TODO: We might want to fire an action here to update the optimistic vote

    const receiptId: string = yield call(() =>
      api.createVote(message, signature, newVote.id)
    )
    if (!receiptId) console.warn('[WARN] Receipt could not be created')

    const vote: Vote = {
      ...newVote,
      message,
      signature
    }

    yield put(createVoteSuccess(vote, wallet))
    yield put(push(locations.pollDetail(newVote.poll_id)))
  } catch (error) {
    yield put(createVoteFailure(error.message))
  }
}
