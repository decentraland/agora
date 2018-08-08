import { ActionType } from 'typesafe-actions'
import * as actions from 'modules/token/actions'

export type TokenActions = ActionType<typeof actions>

export interface Token {
  address: string
  symbol: string
  name: string
}
