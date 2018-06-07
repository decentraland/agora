import { TokenAttributes } from '../Token'
import { VoteAttributes } from '../Vote'
import { OptionAttributes } from '../Option'

export interface PollAttributes {
  id?: number
  name: string
  body?: string
  balance: string // bigint
  token_id: number
  submitter: string
  closes_at: number
  token?: TokenAttributes
  votes?: VoteAttributes[]
  options?: OptionAttributes[]
  created_at?: Date
  updated_at?: Date
}
