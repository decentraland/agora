import { LoadingState } from 'modules/loading/types'
import { ModelById } from 'lib/types'

// Interface and type definitions

export interface Token {
  id: string
  name: string
  address: string
}

export type TokenState = {
  data: ModelById<Token>
  loading: LoadingState
  error: string | null
}
