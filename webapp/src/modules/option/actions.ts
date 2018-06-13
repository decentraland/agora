import { action } from 'typesafe-actions'
import {
  FETCH_POLL_OPTIONS_REQUEST,
  FETCH_POLL_OPTIONS_SUCCESS,
  FETCH_POLL_OPTIONS_FAILURE,
  Option
} from 'modules/option/types'

export const fetchOptionsByPollIdRequest = (pollId: string) =>
  action(FETCH_POLL_OPTIONS_REQUEST, { pollId })
export const fetchOptionsByPollIdSuccess = (
  options: Option[],
  pollId: string
) => action(FETCH_POLL_OPTIONS_SUCCESS, { options, pollId })
export const fetchOptionsByPollIdFailure = (error: string) =>
  action(FETCH_POLL_OPTIONS_FAILURE, { error })
