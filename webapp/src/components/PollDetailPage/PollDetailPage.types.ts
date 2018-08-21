import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'

export type URLParams = {
  id: string
}

export type Tally = {
  [optionId: string]: Result
}

export type Result = {
  votes: number
  option: Option
  winner: boolean
  percentage: number
  token?: Token
}

export type Props = {
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

export type State = {
  activePage: number
}

export type MapStateProps = Pick<
  Props,
  | 'pollId'
  | 'poll'
  | 'wallet'
  | 'currentVote'
  | 'isLoading'
  | 'hasError'
  | 'isConnected'
>

export type MapDispatchProps = Pick<Props, 'onFetchPoll' | 'onNavigate'>
