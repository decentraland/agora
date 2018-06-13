import { LoadingState } from 'modules/loading/types'

// Interface and type definitions

export interface Token {
  symbol: string
  address: string
  name: string
}

export type TokenState = {
  data: { [address: string]: Token }
  loading: LoadingState
  error: string | null
}
