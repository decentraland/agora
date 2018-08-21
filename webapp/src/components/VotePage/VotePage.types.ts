import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Vote } from 'modules/vote/types'
import { Wallet } from 'modules/wallet/types'

export type URLParams = {
  id: string
}

export type Props = {
  match: match<URLParams>
  pollId: string
  poll: PollWithAssociations | null
  wallet: Wallet
  currentVote: Vote | null
  isLoading: boolean
  isConnected: boolean
  onFetchPoll: Function
  onCreateVote: Function
  onNavigate: Function
}

export type State = {
  selectedOptionId: string
}

export type MapStateProps = Pick<
  Props,
  'pollId' | 'poll' | 'wallet' | 'currentVote' | 'isLoading' | 'isConnected'
>

export type MapDispatchProps = Pick<
  Props,
  'onFetchPoll' | 'onCreateVote' | 'onNavigate'
>
