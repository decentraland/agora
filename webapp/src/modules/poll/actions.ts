import { action } from 'typesafe-actions'
import {
  Poll,
  PollWithAssociations,
  PollsRequestFilters
} from 'modules/poll/types'
import { Token } from 'modules/token/types'
import { Option } from 'modules/option/types'
import { Vote } from 'modules/vote/types'

// Fetch Polls

export const FETCH_POLLS_REQUEST = '[Request] Fetch Polls'
export const FETCH_POLLS_SUCCESS = '[Success] Fetch Polls'
export const FETCH_POLLS_FAILURE = '[Failure] Fetch Polls'

export const fetchPollsRequest = ({
  limit,
  offset,
  status,
  type
}: PollsRequestFilters = {}) =>
  action(FETCH_POLLS_REQUEST, {
    limit,
    offset,
    status,
    type
  })
export const fetchPollsSuccess = (
  polls: PollWithAssociations[],
  total: number,
  filters: PollsRequestFilters
) => action(FETCH_POLLS_SUCCESS, { polls, total, filters })
export const fetchPollsFailure = (error: string) =>
  action(FETCH_POLLS_FAILURE, { error })

export type FetchPollsRequestAction = ReturnType<typeof fetchPollsRequest>
export type FetchPollsSuccessAction = ReturnType<typeof fetchPollsSuccess>
export type FetchPollsFailureAction = ReturnType<typeof fetchPollsFailure>

// Fetch Poll

export const FETCH_POLL_REQUEST = '[Request] Fetch Poll'
export const FETCH_POLL_SUCCESS = '[Success] Fetch Poll'
export const FETCH_POLL_FAILURE = '[Failure] Fetch Poll'

export const fetchPollRequest = (id: string) =>
  action(FETCH_POLL_REQUEST, { id })
export const fetchPollSuccess = (
  poll: Poll,
  token: Token,
  votes: Vote[],
  options: Option[]
) => action(FETCH_POLL_SUCCESS, { poll, token, votes, options })
export const fetchPollFailure = (error: string) =>
  action(FETCH_POLL_FAILURE, { error })

export type FetchPollRequestAction = ReturnType<typeof fetchPollRequest>
export type FetchPollSuccessAction = ReturnType<typeof fetchPollSuccess>
export type FetchPollFailureAction = ReturnType<typeof fetchPollFailure>
