import { ActionType } from 'typesafe-actions'
import { LoadingState } from '@dapps/modules/loading/types'
import { ModelById } from '@dapps/lib/types'
import * as actions from 'modules/option/actions'

export const FETCH_POLL_OPTIONS_REQUEST = '[Request] Fetch Poll Options'
export const FETCH_POLL_OPTIONS_SUCCESS = '[Success] Fetch Poll Options'
export const FETCH_POLL_OPTIONS_FAILURE = '[Failure] Fetch Poll Options'

// Interface and type definitions

export type FetchPollOptionsRequest = ReturnType<
  typeof actions.fetchOptionsByPollIdRequest
>

export type OptionActions = ActionType<typeof actions>

export interface Option {
  id: string
  value: string
  poll_id: number
}

export type OptionState = {
  data: ModelById<Option>
  loading: LoadingState
  error: string | null
}
