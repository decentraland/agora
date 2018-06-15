import { OptionAttributes } from '../Option'
import { PollAttributes } from '../Poll'
import { TokenAttributes } from '../Token'
import { Omit } from '../lib/types'

export interface VoteAttributes {
  id?: string
  address: string
  poll_id: string
  option_id: string
  message: string
  signature: string
  created_at?: Date
  updated_at?: Date
}

export interface CastVoteOption extends Omit<VoteAttributes, 'id'> {
  id: string
  option: OptionAttributes
}

export interface CastVote extends Omit<VoteAttributes, 'id'> {
  id: string
  poll: PollAttributes
  token: TokenAttributes
}
