import { ActionType } from 'typesafe-actions'
import { LoadingState } from '@dapps/modules/loading/types'
import * as actions from 'modules/token/actions'
import { ModelByAddress } from 'lib/types'

export const FETCH_TOKENS_REQUEST = '[Request] Fetch Tokens'
export const FETCH_TOKENS_SUCCESS = '[Success] Fetch Tokens'
export const FETCH_TOKENS_FAILURE = '[Failure] Fetch Tokens'

// Interface and type definitions

export type FetchTokensRequest = ReturnType<typeof actions.fetchTokensRequest>

export type TokenActions = ActionType<typeof actions>

export interface Token {
  address: string
  symbol: string
  name: string
}

export type TokenState = {
  data: ModelByAddress<Token>
  loading: LoadingState
  error: string | null
}
