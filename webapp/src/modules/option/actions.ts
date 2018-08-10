import { action } from 'typesafe-actions'
import { Option } from 'modules/option/types'

// Fetch Poll Options

export const FETCH_POLL_OPTIONS_REQUEST = '[Request] Fetch Poll Options'
export const FETCH_POLL_OPTIONS_SUCCESS = '[Success] Fetch Poll Options'
export const FETCH_POLL_OPTIONS_FAILURE = '[Failure] Fetch Poll Options'

export const fetchOptionsByPollIdRequest = (pollId: string) =>
  action(FETCH_POLL_OPTIONS_REQUEST, { pollId })
export const fetchOptionsByPollIdSuccess = (
  options: Option[],
  pollId: string
) => action(FETCH_POLL_OPTIONS_SUCCESS, { options, pollId })
export const fetchOptionsByPollIdFailure = (error: string) =>
  action(FETCH_POLL_OPTIONS_FAILURE, { error })

export type FetchPollOptionsRequestAction = ReturnType<
  typeof fetchOptionsByPollIdRequest
>
export type FetchPollOptionsSuccessAction = ReturnType<
  typeof fetchOptionsByPollIdSuccess
>
export type FetchPollOptionsFailureAction = ReturnType<
  typeof fetchOptionsByPollIdFailure
>
