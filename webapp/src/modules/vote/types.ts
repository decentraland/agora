import { LoadingState } from 'modules/loading/types'
import { ModelById } from 'lib/types'

// Interface and type definitions

export interface Vote {
  id: string
  address: string
  poll_id: number
  option_id: number
  message: string
  signature: string
}

export type VoteState = {
  data: ModelById<Vote>
  loading: LoadingState
  error: string | null
}
