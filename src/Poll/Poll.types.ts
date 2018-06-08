import { TokenAttributes } from '../Token'
import { VoteAttributes } from '../Vote'
import { OptionAttributes } from '../Option'

export interface PollAttributes {
  id?: number
  title: string
  description?: string
  balance: string // bigint
  token_address: string
  submitter: string
  closes_at: number
  token?: TokenAttributes
  votes?: VoteAttributes[]
  options?: OptionAttributes[]
  created_at?: Date
  updated_at?: Date
}
