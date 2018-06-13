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
import { getData as getWallet } from 'modules/wallet/selectors'
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
    const now = Date.now()

    // TODO: Balance by poll symbol
    const payload = `
Poll Id: ${newVote.poll_id}
Option Id: ${newVote.option_id}
Current Balance: ${wallet.balances.mana}
Token: MANA
Timestamp: ${now}
    `
    const { message, signature } = yield call(() => eth.sign(payload))
    // TODO: We might want to fire an action here to update the optimistic vote

    const voteId: string = yield call(() =>
      api.createVote(message, signature, newVote.id)
    )
    if (!voteId) throw new Error('An error occurred trying to vote')

    const vote: Vote = {
      ...newVote,
      id: voteId,
      message,
      signature
    }

    yield put(createVoteSuccess(vote))
    yield put(push(locations.pollDetail(newVote.poll_id)))
  } catch (error) {
    yield put(createVoteFailure(error.message))
  }
}
