import { TokenAttributes } from '../Token'
import { VoteAttributes } from '../Vote'
import { OptionAttributes } from '../Option'
import { AccountBalanceAttributes } from '../AccountBalance'

interface Poll {
  id?: string
  title: string
  description?: string
  balance: string // DECIMAL
  token_address: string
  submitter: string
  closes_at: number
  created_at?: Date
  updated_at?: Date
}

export interface PollAttributes extends Poll {
  token?: TokenAttributes
  votes?: VoteAttributes[]
  options?: OptionAttributes[]
  accounts?: AccountBalanceAttributes[]
}

export interface PollWithPointers extends Poll {
  votes_ids: number[]
  options_ids: number[]
}
