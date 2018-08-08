import { action } from 'typesafe-actions'
import { Vote, NewVote } from 'modules/vote/types'
import { Wallet } from 'modules/wallet/types'

// Fetch Poll Votes

export const FETCH_POLL_VOTES_REQUEST = '[Request] Fetch Poll Votes'
export const FETCH_POLL_VOTES_SUCCESS = '[Success] Fetch Poll Votes'
export const FETCH_POLL_VOTES_FAILURE = '[Failure] Fetch Poll Votes'

export const fetchVotesByPollIdRequest = (pollId: string) =>
  action(FETCH_POLL_VOTES_REQUEST, { pollId })
export const fetchVotesByPollIdSuccess = (votes: Vote[], pollId: string) =>
  action(FETCH_POLL_VOTES_SUCCESS, { votes, pollId })
export const fetchVotesByPollIdFailure = (error: string) =>
  action(FETCH_POLL_VOTES_FAILURE, { error })

export type FetchPollVotesRequestAction = ReturnType<
  typeof fetchVotesByPollIdRequest
>
export type FetchPollVotesSuccessAction = ReturnType<
  typeof fetchVotesByPollIdSuccess
>
export type FetchPollVotesFailureAction = ReturnType<
  typeof fetchVotesByPollIdFailure
>

// Create Vote

export const CREATE_VOTE_REQUEST = '[Request] Vote'
export const CREATE_VOTE_SUCCESS = '[Success] Vote'
export const CREATE_VOTE_FAILURE = '[Failure] Vote'

export const createVoteRequest = (newVote: NewVote) =>
  action(CREATE_VOTE_REQUEST, { newVote })
export const createVoteSuccess = (vote: Vote, wallet: Wallet) =>
  action(CREATE_VOTE_SUCCESS, { vote, wallet })
export const createVoteFailure = (error: string) =>
  action(CREATE_VOTE_FAILURE, { error })

export type CreateVoteRequestAction = ReturnType<typeof createVoteRequest>
export type CreateVoteSuccessAction = ReturnType<typeof createVoteSuccess>
export type CreateVoteFailureAction = ReturnType<typeof createVoteFailure>
