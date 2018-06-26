import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/vote/actions'
import { ModelById, Overwrite } from 'lib/types'

export const FETCH_POLL_VOTES_REQUEST = '[Request] Fetch Poll Votes'
export const FETCH_POLL_VOTES_SUCCESS = '[Success] Fetch Poll Votes'
export const FETCH_POLL_VOTES_FAILURE = '[Failure] Fetch Poll Votes'

export const CREATE_VOTE_REQUEST = '[Request] Vote'
export const CREATE_VOTE_SUCCESS = '[Success] Vote'
export const CREATE_VOTE_FAILURE = '[Failure] Vote'

// Interface and type definitions

export type FetchPollVotesRequest = ReturnType<
  typeof actions.fetchVotesByPollIdRequest
>
export type CreateVoteRequest = ReturnType<typeof actions.createVoteRequest>

export type VoteActions = ActionType<typeof actions>

export interface Vote {
  id: string
  account_address: string
  account_balance: number
  poll_id: string
  option_id: string
  message: string
  signature: string
  updated_at: string
  created_at: string
}

export interface NewVote
  extends Overwrite<
      Vote,
      {
        message?: string
        signature?: string
        updated_at?: string
        created_at?: string
      }
    > {}

export type VoteState = {
  data: ModelById<Vote>
  loading: LoadingState
  error: string | null
}
