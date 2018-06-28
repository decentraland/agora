import { LoadingState } from 'modules/loading/types'
import { ModelByAddress } from 'lib/types'

// Interface and type definitions

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
