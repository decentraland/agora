import { action } from 'typesafe-actions'
import {
  FETCH_POLL_VOTES_REQUEST,
  FETCH_POLL_VOTES_SUCCESS,
  FETCH_POLL_VOTES_FAILURE,
  CREATE_VOTE_REQUEST,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,
  Vote,
  NewVote
} from 'modules/vote/types'

export const fetchVotesByPollIdRequest = (pollId: string) =>
  action(FETCH_POLL_VOTES_REQUEST, { pollId })
export const fetchVotesByPollIdSuccess = (votes: Vote[], pollId: string) =>
  action(FETCH_POLL_VOTES_SUCCESS, { votes, pollId })
export const fetchVotesByPollIdFailure = (error: string) =>
  action(FETCH_POLL_VOTES_FAILURE, { error })

export const createVoteRequest = (newVote: NewVote) =>
  action(CREATE_VOTE_REQUEST, { newVote })
export const createVoteSuccess = (vote: Vote) =>
  action(CREATE_VOTE_SUCCESS, { vote })
export const createVoteFailure = (error: string) =>
  action(CREATE_VOTE_FAILURE, { error })
