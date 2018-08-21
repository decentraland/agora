import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'types'
import { isConnected } from '@dapps/modules/wallet/selectors'
import { navigateTo, NavigateToAction } from '@dapps/modules/location/actions'
import { getPolls, isLoading as isPollLoading } from 'modules/poll/selectors'
import { getWallet } from 'modules/wallet/selectors'
import { fetchPollRequest, FetchPollRequestAction } from 'modules/poll/actions'
import {
  createVoteRequest,
  CreateVoteRequestAction
} from 'modules/vote/actions'
import { Wallet } from 'modules/wallet/types'
import { NewVote } from 'modules/vote/types'
import { findWalletVote } from 'modules/vote/utils'
import { Props, MapStateProps, MapDispatchProps } from './VotePage.types'

import VotePage from './VotePage'

const mapState = (state: RootState, ownProps: Props): MapStateProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isPollLoading(state)
  const wallet = getWallet(state) as Wallet
  const polls = getPolls(state)

  const poll = polls[pollId] || null
  const currentVote = poll ? findWalletVote(wallet, poll.votes) : null

  return {
    pollId,
    poll,
    wallet,
    currentVote,
    isLoading,
    isConnected: isConnected(state)
  }
}

const mapDispatch = (
  dispatch: RootDispatch<
    FetchPollRequestAction | CreateVoteRequestAction | NavigateToAction
  >
): MapDispatchProps => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id)),
  onCreateVote: (newVote: NewVote) => dispatch(createVoteRequest(newVote)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect(
  mapState,
  mapDispatch
)(VotePage)
