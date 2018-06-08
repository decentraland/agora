import { LoadingState } from 'modules/loading/types'
import { ModelById } from 'lib/types'

// Interface and type definitions

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
