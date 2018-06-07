import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { PollActions } from 'modules/poll/types'
import { fetchPollRequest } from 'modules/poll/actions'
import { getPolls, isLoading } from 'modules/poll/selectors'
import { PollDetailPageProps } from 'components/PollDetailPage/types'

import PollDetailPage from './PollDetailPage'

const mapState = (
  state: RootState,
  ownProps: PollDetailPageProps
): PollDetailPageProps => {
  const polls = getPolls(state)
  const pollId = ownProps.match.params.id

  return {
    ...ownProps,
    poll: polls[pollId],
    isLoading: isLoading(state)
  }
}

const mapDispatch = (dispatch: Dispatch<PollActions>) => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id))
})

export default connect<PollDetailPageProps>(mapState, mapDispatch)(
  PollDetailPage
)
