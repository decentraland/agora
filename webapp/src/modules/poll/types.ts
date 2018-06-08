import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/poll/actions'
import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'
import { Vote } from 'modules/vote/types'
import { ModelById, Overwrite } from 'lib/types'

export const FETCH_POLL_REQUEST = '[Request] Fetch Poll'
export const FETCH_POLL_SUCCESS = '[Success] Fetch Poll'
export const FETCH_POLL_FAILURE = '[Failure] Fetch Poll'

// Interface and type definitions

export type FetchDomainRequest = ReturnType<typeof actions.fetchPollRequest>

export interface Poll {
  id: string
  title: string
  description?: string
  balance: number
  submitter: string
  closes_at: number
}

export interface PollWithPointers extends Poll {
  token_address: string
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

export type PollActions = ActionType<typeof actions>

export type PollState = {
  data: ModelById<PollWithPointers>
  loading: LoadingState
  error: string | null
}
