import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'

export interface URLParams {
  id: string
}

export interface PollDetailPageProps {
  match: match<URLParams>
  pollId: string
  poll: PollWithAssociations | null
  wallet: Wallet
  currentVote: Vote | null
  isLoading: boolean
  hasError: boolean
  isConnected: boolean
  onFetchPoll: Function
  onNavigate: Function
}

export interface Tally {
  [optionId: string]: Result
}

export interface Result {
  votes: number
  option: Option
  winner: boolean
  percentage: number
  token?: Token
}
