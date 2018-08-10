import { Overwrite } from '@dapps/lib/types'

// Interface and type definitions

export interface Vote {
  id: string
  account_address: string
  account_balance: number
  poll_id: string
  option_id: string
  timestamp: number
  message: string
  signature: string
}

export interface NewVote
  extends Overwrite<Vote, { message?: string; signature?: string }> {}
