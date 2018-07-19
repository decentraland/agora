import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'decentraland-dapps/dist/modules/loading/types'
import * as actions from 'modules/poll/actions'
import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'
import { Vote } from 'modules/vote/types'
import { ModelById, Overwrite } from 'lib/types'

export const FETCH_POLLS_REQUEST = '[Request] Fetch Polls'
export const FETCH_POLLS_SUCCESS = '[Success] Fetch Polls'
export const FETCH_POLLS_FAILURE = '[Failure] Fetch Polls'

export const FETCH_POLL_REQUEST = '[Request] Fetch Poll'
export const FETCH_POLL_SUCCESS = '[Success] Fetch Poll'
export const FETCH_POLL_FAILURE = '[Failure] Fetch Poll'

// Interface and type definitions

export type FetchPollsRequest = ReturnType<typeof actions.fetchPollsRequest>
export type FetchPollRequest = ReturnType<typeof actions.fetchPollRequest>

export type PollActions = ActionType<typeof actions>

export interface Poll {
  id: string
  title: string
  balance: number
  description?: string
  token_address: string
  submitter: string
  closes_at: number
}

export interface PollWithPointers extends Poll {
  vote_ids: string[]
  option_ids: string[]
}

export interface PollWithAssociations extends Poll {
  token: Token
  votes: Vote[]
  options: Option[]
}

export interface PollResponse
  extends Overwrite<
      PollWithAssociations,
      { balance: string; closes_at: string }
    > {}

export type PollState = {
  data: ModelById<PollWithPointers>
  loading: LoadingState
  error: string | null
}
