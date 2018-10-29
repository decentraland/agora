import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'
import { Vote } from 'modules/vote/types'
import { Overwrite } from '@dapps/lib/types'

export type FilterStatus = 'active' | 'expired' | 'all'
export type FilterType = 'decentraland' | 'district' | 'all'

export interface PollsRequestFilters {
  limit?: number
  offset?: number
  status?: FilterStatus
  type?: FilterType
}

export interface Poll {
  id: string
  title: string
  balance: number
  description?: string
  token_address: string
  submitter: string
  closes_at: number
}

export interface PollWithPointers extends Poll {
  vote_ids: string[]
  option_ids: string[]
}

export interface PollWithAssociations extends Poll {
  token: Token
  votes: Vote[]
  options: Option[]
}

export interface PollResponse
  extends Overwrite<
      PollWithAssociations,
      { balance: string; closes_at: string }
    > {}

export interface PollsResponse {
  polls: PollResponse[]
  total: number
}
