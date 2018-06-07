import { action } from 'typesafe-actions'
import {
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  Poll
} from 'modules/poll/types'
import { Token } from 'modules/token/types'
import { Option } from 'modules/option/types'
import { Vote } from 'modules/vote/types'

export const fetchPollRequest = (id: string) =>
  action(FETCH_POLL_REQUEST, { id })
export const fetchPollSuccess = (
  poll: Poll,
  token: Token,
  votes: Vote[],
  options: Option[]
) =>
  action(FETCH_POLL_SUCCESS, {
    poll,
    token,
    votes,
    options
  })
export const fetchPollFailure = (error: string) =>
  action(FETCH_POLL_FAILURE, { error })
