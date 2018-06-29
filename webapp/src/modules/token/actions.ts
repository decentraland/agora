import { action } from 'typesafe-actions'
import {
  FETCH_TOKENS_REQUEST,
  FETCH_TOKENS_SUCCESS,
  FETCH_TOKENS_FAILURE,
  Token
} from 'modules/token/types'

export const fetchTokensRequest = () => action(FETCH_TOKENS_REQUEST, {})
export const fetchTokensSuccess = (tokens: Token[]) =>
  action(FETCH_TOKENS_SUCCESS, { tokens })
export const fetchTokensFailure = (error: string) =>
  action(FETCH_TOKENS_FAILURE, { error })
