import { action } from 'typesafe-actions'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  Poll,
  PollWithPointers
} from 'modules/poll/types'
import { Token } from 'modules/token/types'
import { Option } from 'modules/option/types'
import { Vote } from 'modules/vote/types'

export const fetchPollsRequest = () => action(FETCH_POLLS_REQUEST, {})
export const fetchPollsSuccess = (polls: PollWithPointers[]) =>
  action(FETCH_POLLS_SUCCESS, { polls })
export const fetchPollsFailure = (error: string) =>
  action(FETCH_POLLS_FAILURE, { error })

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
