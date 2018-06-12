import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { PollActions } from 'modules/poll/types'
import { fetchPollRequest } from 'modules/poll/actions'
import { getPolls, isLoading as isPollLoading } from 'modules/poll/selectors'
import { isLoading as isTokenLoading } from 'modules/token/selectors'
import { isLoading as isVoteLoading } from 'modules/vote/selectors'
import { isLoading as isOptionLoading } from 'modules/option/selectors'
import { PollDetailPageProps } from 'components/PollDetailPage/types'

import PollDetailPage from './PollDetailPage'

const mapState = (
  state: RootState,
  ownProps: PollDetailPageProps
): PollDetailPageProps => {
  const polls = getPolls(state)
  const pollId = ownProps.match.params.id

  const isLoading =
    isPollLoading(state) ||
    isTokenLoading(state) ||
    isVoteLoading(state) ||
    isOptionLoading(state)

  return {
    ...ownProps,
    isLoading,
    poll: polls[pollId]
  }
}

const mapDispatch = (dispatch: Dispatch<PollActions>) => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id))
})

export default connect<PollDetailPageProps>(mapState, mapDispatch)(
  PollDetailPage
)
