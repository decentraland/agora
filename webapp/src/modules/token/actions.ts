import { action } from 'typesafe-actions'
import { Token } from 'modules/token/types'

// Fetch Tokens

export const FETCH_TOKENS_REQUEST = '[Request] Fetch Tokens'
export const FETCH_TOKENS_SUCCESS = '[Success] Fetch Tokens'
export const FETCH_TOKENS_FAILURE = '[Failure] Fetch Tokens'

export const fetchTokensRequest = () => action(FETCH_TOKENS_REQUEST, {})
export const fetchTokensSuccess = (tokens: Token[]) =>
  action(FETCH_TOKENS_SUCCESS, { tokens })
export const fetchTokensFailure = (error: string) =>
  action(FETCH_TOKENS_FAILURE, { error })

export type FetchTokensRequestAction = ReturnType<typeof fetchTokensRequest>
export type FetchTokensSuccessAction = ReturnType<typeof fetchTokensSuccess>
export type FetchTokensFailureAction = ReturnType<typeof fetchTokensFailure>
